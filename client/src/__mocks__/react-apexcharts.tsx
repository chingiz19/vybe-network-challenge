/**
 * This mock replaces the `react-apexcharts` component to avoid issues
 * when running tests in environments where certain browser-specific
 * APIs, like `ResizeObserver`, are not available. The actual
 * `react-apexcharts` component relies on these APIs, which can cause
 * tests to fail or produce errors such as "ReferenceError: ResizeObserver
 * is not defined".
 *
 * By mocking this component, we focus our tests on the logic of our
 * React components rather than the rendering of charts, which can be
 * safely assumed to work based on the library's own tests.
 *
 * This approach is also motivated by a known issue in the
 * `react-apexcharts` library:
 * https://github.com/apexcharts/react-apexcharts/issues/425
 *
 * This issue discusses problems encountered when using `react-apexcharts`
 * in testing environments like Jest, and this mock provides a temporary
 * workaround until a more permanent solution is available.
 *
 * @module MockApexCharts
 */

const ApexCharts = jest.fn().mockImplementation(() => {
  return <div data-testid="mocked-apexchart">Mocked ApexChart</div>;
});

export default ApexCharts;
