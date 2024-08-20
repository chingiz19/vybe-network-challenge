/**
 * Timeseries Class
 *
 * This class is designed to collect and manage time series data in memory.
 * For production use cases, it's recommended to implement this functionality
 * using a permanent storage solution such as a SQL database or a time-series database
 * like InfluxDB to ensure data persistence, scalability, and reliability.
 *
 * This implementation is tailored for demonstration purposes and should be adapted
 * to utilize appropriate data storage mechanisms in a real-world application.
 */

import { logger } from "../infrastucture";

type TimeSeriesData<T> = {
  timestamp: number;
  value: T;
};

type TimeseriesOptions = {
  readySize?: number;
  intervalInSeconds?: number;
  maxSizeMb?: number;
};

class Timeseries<T> {
  private data: Array<TimeSeriesData<T>> = [];
  private intervalId: NodeJS.Timeout | null = null;
  private readySize: number;
  private intervalInSeconds: number;
  private maxSizeMb: number;

  constructor(opts?: TimeseriesOptions) {
    const { readySize = 20, intervalInSeconds = 10, maxSizeMb = 20 } = opts ||
      {};

    this.readySize = readySize;
    this.intervalInSeconds = intervalInSeconds;
    this.maxSizeMb = maxSizeMb;
  }

  /**
   * Sets the source function that will be called at regular intervals
   * to fetch data and populate the time series.
   */
  public setSource(
    fn: () => Promise<T>,
    intervalInSeconds: number = this.intervalInSeconds,
  ): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(async () => {
      try {
        const dataPoint = await fn();
        this.addDataPoint(dataPoint);
      } catch (error) {
        logger.error("[Timeseries] Error fetching data:", error);
      }
    }, intervalInSeconds * 1000);
  }

  public getData() {
    if (this.isReady) {
      return this.data;
    }

    return [];
  }

  public resetData() {
    this.data = [];
  }

  public get isReady() {
    return this.data.length > this.readySize;
  }

  private addDataPoint(value: T): void {
    const dataPoint = {
      timestamp: Date.now(),
      value: value,
    };

    this.data.push(dataPoint);

    this.pruneDataIfNeeded();
  }

  /**
   * Prunes the oldest data points if the total size exceeds the maxSizeMb.
   */
  private pruneDataIfNeeded(): void {
    let totalSizeBytes = this.calculateTotalSizeBytes();

    const maxSizeBytes = this.maxSizeMb * 1024 * 1024;

    const isPrunning = totalSizeBytes > maxSizeBytes && this.data.length > 0;

    if (isPrunning) {
      logger.info(
        "[Timeseries] Pruning oldest data point to maintain size limit.",
      );
    }

    while (totalSizeBytes > maxSizeBytes && this.data.length > 0) {
      const removed = this.data.shift(); // Remove the oldest entry
      if (!removed) break;
      totalSizeBytes -= this.calculateSizeInBytes(removed);
    }

    if (isPrunning) {
      logger.info("[Timeseries] Done pruning!");
    }
  }

  /**
   * Calculates the total size of the data array in bytes.
   */
  private calculateTotalSizeBytes() {
    return this.data.reduce(
      (total, dataPoint) => total + this.calculateSizeInBytes(dataPoint),
      0,
    );
  }

  /**
   * Estimates the size of a data point in bytes by serializing it to JSON.
   */
  private calculateSizeInBytes(dataPoint: TimeSeriesData<T>) {
    return new TextEncoder().encode(JSON.stringify(dataPoint)).length;
  }
}

export default Timeseries;
