import { Size } from "../types";

const Logo = ({ width, height }: Size) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 283 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_13853_1512)">
      <path
        d="M223.132 10L116.562 172.424L141.206 210L272.5 10H223.132Z"
        fill="url(#paint0_linear_13853_1512)"
      ></path>
      <path d="M80.91 10H10L45.4142 64.0605L80.91 10Z" fill="white"></path>
      <path
        d="M88.2537 21.0676L52.7578 75.1283L77.4009 112.704L112.897 58.5626L88.2537 21.0676Z"
        fill="url(#paint1_linear_13853_1512)"
      ></path>
      <path
        d="M159.322 10L60.0156 161.353L84.6588 198.929L208.527 10H159.322Z"
        fill="url(#paint2_linear_13853_1512)"
      ></path>
    </g>
    <defs>
      <filter
        id="filter0_d_13853_1512"
        x="0"
        y="0"
        width="282.5"
        height="220"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        ></feColorMatrix>
        <feOffset></feOffset>
        <feGaussianBlur stdDeviation="5"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
        ></feColorMatrix>
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_13853_1512"
        ></feBlend>
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_13853_1512"
          result="shape"
        ></feBlend>
      </filter>
      <linearGradient
        id="paint0_linear_13853_1512"
        x1="256.099"
        y1="9.99999"
        x2="93.3217"
        y2="239.024"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white"></stop>
        <stop offset="0.9999" stop-color="white" stop-opacity="0.421875"></stop>
        <stop offset="1" stop-color="white" stop-opacity="0"></stop>
      </linearGradient>
      <linearGradient
        id="paint1_linear_13853_1512"
        x1="113.274"
        y1="30.3272"
        x2="25.7819"
        y2="151.118"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white"></stop>
        <stop offset="1" stop-color="white" stop-opacity="0.56"></stop>
      </linearGradient>
      <linearGradient
        id="paint2_linear_13853_1512"
        x1="133.68"
        y1="92.7759"
        x2="-20.0556"
        y2="378.281"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white"></stop>
        <stop offset="1" stop-color="white" stop-opacity="0"></stop>
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;
