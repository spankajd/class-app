import React from 'react';

export const Logo = ({ className, fill = '#2DD5c9' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      className={className}
    >
      <path
        fill="#fff"
        d="M20.998 9.095c-.43-.497-.443-1.072 0-1.532.43-.434.987-.447 1.52 0l-1.52 1.532zm-7 7.064c-.43-.498-.443-1.085 0-1.533.43-.434.988-.447 1.532 0l-1.531 1.533zm5.595-.127l1.57-1.584-1.695-1.712c-1.38-1.392-.975-2.133-.658-2.452.202-.205.405-.358.545-.434.19.37.443.728.759 1.034 1.644 1.673 3.442 1.443 4.822.04.823-.832 1.216-1.598 1.316-1.981l-1.355-.754a5.56 5.56 0 0 1-.973 1.405c-.748.766-1.458.766-1.937.37l2.824-2.835-.354-.358c-1.66-1.686-3.203-1.775-4.596-.37-.924.932-1.05 2.082-.646 3.129l-1.038-1.238c-.101.038-.29.19-.481.383-.544.562-.67 1.43-.531 2.005l-.697-.6-1.38 1.392 1.898 1.916c-1.506-1.252-2.86-1.188-4.112.076-1.266 1.277-1.19 2.836-.14 4.138l-.177-.178c-1.127-1.137-2.215-1.381-3.292-.282-.632.626-.733 1.239-.67 1.789l-2.658-2.67-1.546 1.558 5.138 5.2h3.14l-2.164-2.185c-.76-.754-.988-1.278-.52-1.75.342-.357.735-.346 1.216.14l2.608 2.644 1.569-1.583-1.95-1.967c1.545 1.29 3.229.971 4.507-.331.671-.665 1.037-1.278 1.216-1.7l-1.38-.777a6.155 6.155 0 0 1-.835 1.149c-.76.766-1.469.765-1.949.37l2.798-2.823 1.808 1.826z"
      />
      <path fill={fill} d="M3.425 22.987l3.15 3.18 3.152-3.18z" />
    </svg>
  );
};


export const Dice = ({ className }) => {
  return (

    <svg className={className} viewBox="0 0 423.757 423.757">
      <g>
        <g>
          <path d="M189.294,385.219l112.522,38.538l98.514-98.509l-113.3-37.765L189.294,385.219z M239.962,379.203
			c-5.96,5.96-15.672,8.54-21.699,5.76c-6.021-2.78-6.077-9.861-0.113-15.821c5.96-5.96,15.672-8.54,21.699-5.76
			C245.875,366.162,245.921,373.243,239.962,379.203z M276.298,391.931c-5.96,5.96-15.672,8.54-21.699,5.76
			c-6.021-2.78-6.077-9.861-0.113-15.821c5.965-5.96,15.672-8.54,21.699-5.76C282.207,378.89,282.258,385.971,276.298,391.931z
			 M349.56,334.94c5.96-5.96,15.672-8.54,21.699-5.76c6.021,2.78,6.077,9.861,0.118,15.821s-15.672,8.54-21.699,5.76
			S343.601,340.9,349.56,334.94z M313.331,323.031c5.96-5.96,15.672-8.54,21.699-5.76c6.021,2.78,6.077,9.861,0.113,15.821
			c-5.96,5.96-15.672,8.54-21.699,5.76C307.423,336.072,307.372,328.991,313.331,323.031z M312.415,388.019
			c6.021,2.78,6.077,9.861,0.113,15.821c-5.96,5.96-15.672,8.54-21.699,5.76s-6.077-9.861-0.118-15.821
			C296.676,387.825,306.388,385.244,312.415,388.019z M298.693,304.538c6.021,2.78,6.077,9.861,0.113,15.821
			c-5.96,5.96-15.672,8.54-21.699,5.76c-6.021-2.78-6.077-9.861-0.113-15.821C282.954,304.338,292.667,301.763,298.693,304.538z"/>
          <path d="M402.158,311.634l-37.202-111.611l-111.611-37.207l37.202,111.606L402.158,311.634z M319.281,224.118
			c4.168-4.168,12.544-2.555,18.708,3.61s7.782,14.541,3.61,18.708c-4.168,4.168-12.544,2.555-18.708-3.61
			C316.726,236.662,315.108,228.285,319.281,224.118z"/>
          <path d="M135.171,0L29.939,52.613l105.231,52.613l105.226-52.613L135.171,0z M135.171,63.288c-8.714,0-15.785-4.782-15.785-10.675
			c0-5.898,7.066-10.675,15.785-10.675s15.785,4.782,15.785,10.675C150.95,58.511,143.885,63.288,135.171,63.288z"/>
          <path d="M162.22,201.728c5.028-1.853,9.231,1.08,10.685,6.702l63.022-63.022l12.805,4.27V63.529l-106.819,53.412v122.481
			l10.798-10.798c-1.101-1.951-1.761-4.48-1.761-7.475C150.95,212.716,155.999,204.022,162.22,201.728z M230.956,86.866
			c6.226-2.294,11.269,2.678,11.269,11.105c0,8.427-5.043,17.121-11.269,19.415c-6.226,2.294-11.269-2.678-11.269-11.105
			C219.686,97.853,224.73,89.16,230.956,86.866z M198.843,142.003c6.226-2.294,11.269,2.678,11.269,11.105
			c0,8.427-5.043,17.121-11.269,19.415c-6.226,2.294-11.269-2.678-11.269-11.105C187.574,152.991,192.622,144.297,198.843,142.003z
			 M150.95,140.175c0-8.427,5.043-17.121,11.269-19.415c6.226-2.294,11.269,2.678,11.269,11.105c0,8.428-5.043,17.121-11.269,19.415
			C155.994,153.574,150.95,148.603,150.95,140.175z"/>
          <path d="M21.599,202.839l105.313,51.579l1.51-1.51V116.941L21.599,63.529V202.839z M107.855,201.728
			c6.226,2.294,11.269,10.988,11.269,19.415s-5.043,13.399-11.269,11.105c-6.226-2.294-11.269-10.988-11.269-19.415
			C96.586,204.406,101.635,199.434,107.855,201.728z M75.011,140.298c6.226,2.294,11.269,10.987,11.269,19.415
			c0,8.427-5.043,13.399-11.269,11.105c-6.226-2.294-11.269-10.988-11.269-19.415C63.741,142.976,68.79,138.004,75.011,140.298z
			 M41.208,86.866c6.226,2.294,11.269,10.987,11.269,19.415c0,8.427-5.043,13.399-11.269,11.105
			c-6.226-2.294-11.269-10.987-11.269-19.415C29.939,89.544,34.982,84.572,41.208,86.866z"/>
          <path d="M239.726,164.639l-98.514,98.504l38.543,112.533l97.736-97.746L239.726,164.639z M197.655,338.565
			c-5.96,5.96-13.046,5.909-15.821-0.118c-2.775-6.026-0.2-15.739,5.76-21.699c5.96-5.96,13.046-5.909,15.821,0.113
			C206.19,322.883,203.615,332.605,197.655,338.565z M230.525,221.773c-5.96,5.96-13.046,5.908-15.821-0.113
			c-2.78-6.021-0.2-15.739,5.76-21.699c5.96-5.96,13.046-5.908,15.821,0.113C239.066,206.1,236.485,215.813,230.525,221.773z"/>
        </g>
      </g>
    </svg>

  )
}

export const SymbolIcon = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 511.999 511.999">
      <g>
        <g>
          <path d="M430.307,92.63H281.029v-52.19c0-5.633-4.566-10.199-10.199-10.199H34.569c-5.633,0-10.199,4.566-10.199,10.199v138.074
        c0,5.633,4.566,10.199,10.199,10.199h140.66v34.803c0,4.125,2.486,7.844,6.296,9.423c1.262,0.523,2.587,0.777,3.901,0.777
        c2.654,0,5.263-1.037,7.214-2.987l42.015-42.015h8.589v17.478c0,5.633,4.566,10.199,10.199,10.199h26.018l30.701,30.702
        c1.952,1.951,4.56,2.987,7.214,2.987c1.314,0,2.64-0.255,3.901-0.777c3.811-1.579,6.296-5.297,6.296-9.423v-23.49h102.734
        c5.633,0,10.199-4.566,10.199-10.199V102.829C440.507,97.196,435.941,92.63,430.307,92.63z M260.63,168.314H230.43v0.001
        c-2.705,0-5.299,1.075-7.212,2.987l-27.591,27.591v-20.379c0-5.633-4.566-10.199-10.199-10.199H44.768V50.639H260.63V168.314z
         M420.108,195.993H317.374c-5.633,0-10.199,4.566-10.199,10.199v9.066l-16.277-16.278c-1.912-1.912-4.507-2.987-7.212-2.987
        h-20.043v-7.279h7.186c5.633,0,10.199-4.566,10.199-10.199v-65.486h139.08V195.993z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M393.608,128.616h-85.959c-5.633,0-10.199,4.566-10.199,10.199s4.566,10.199,10.199,10.199h85.959
        c5.633,0,10.199-4.566,10.199-10.199S399.241,128.616,393.608,128.616z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M393.608,159.242h-85.959c-5.633,0-10.199,4.566-10.199,10.199s4.566,10.199,10.199,10.199h85.959
        c5.633,0,10.199-4.566,10.199-10.199S399.241,159.242,393.608,159.242z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M158.55,245.93c-7.239-7.726-17.463-12.157-28.05-12.157h-25.995c-10.587,0-20.81,4.432-28.049,12.157
        c-7.239,7.726-10.996,18.216-10.306,28.781l1.156,17.715l2.696,41.369c1.064,16.303,10.245,30.737,24.561,38.61
        c7.182,3.951,15.06,5.926,22.94,5.926c7.878,0,15.759-1.976,22.939-5.926c14.316-7.873,23.497-22.308,24.561-38.61l3.083-47.272
        v-0.001l0.77-11.811C169.543,264.147,165.788,253.656,158.55,245.93z M86.504,273.383c-0.328-5.03,1.389-9.827,4.836-13.507
        c3.447-3.679,8.122-5.705,13.164-5.705h19.444l-3.805,10.147c-1.341,1.919-9.789,12.567-33.173,16.218L86.504,273.383z
         M144.646,332.467c-0.608,9.317-5.854,17.565-14.035,22.065c-8.209,4.515-18.01,4.515-26.219,0
        c-8.181-4.5-13.427-12.748-14.035-22.065l-2.054-31.503c19.356-2.663,31.783-9.313,39.425-15.428
        c1.496,1.093,3.178,2.122,5.044,3.085c3.284,1.697,8.04,3.379,14.402,5.094L144.646,332.467z M142.134,270.499
        c-0.892-0.461-1.564-0.871-2.068-1.215l3.546-9.457c0.016,0.017,0.035,0.032,0.051,0.049c3.334,3.559,5.051,8.163,4.862,13.014
        C144.966,271.801,143.089,270.992,142.134,270.499z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M234.842,469.741l-4.306-23.763c-5.271-29.095-28.321-52.317-57.357-57.785c-4.386-0.826-8.869-1.244-13.325-1.244
        h-12.965c-2.705,0-5.299,1.075-7.212,2.987l-22.173,22.174l-22.175-22.175c-1.912-1.912-4.507-2.987-7.212-2.987H75.151
        c-4.457,0-8.94,0.419-13.324,1.244c-29.036,5.467-52.087,28.688-57.358,57.785l-4.305,23.764c-0.539,2.975,0.27,6.035,2.208,8.355
        c1.938,2.32,4.805,3.661,7.828,3.661h214.607c3.023,0,5.89-1.341,7.828-3.661S235.38,472.715,234.842,469.741z M22.411,461.362
        v-0.001l2.128-11.746c3.775-20.834,20.276-37.461,41.061-41.374c3.143-0.592,6.357-0.892,9.551-0.892h8.741l26.399,26.399
        c1.912,1.912,4.507,2.987,7.212,2.987s5.299-1.075,7.212-2.987l26.398-26.399h8.741c3.193,0,6.407,0.3,9.551,0.892
        c20.785,3.913,37.286,20.541,41.061,41.374l2.128,11.747H22.411z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M435.544,245.929c-7.239-7.725-17.462-12.156-28.05-12.156h-25.995c-10.588,0-20.811,4.432-28.05,12.157
        c-7.238,7.727-10.995,18.217-10.305,28.781l1.156,17.715l2.698,41.369c1.064,16.303,10.245,30.737,24.561,38.61
        c7.182,3.951,15.06,5.926,22.94,5.926c7.878,0,15.759-1.976,22.939-5.926c14.316-7.873,23.497-22.308,24.561-38.61l3.082-47.272
        l0.77-11.812C446.538,264.146,442.782,253.655,435.544,245.929z M363.499,273.383c-0.327-5.03,1.39-9.827,4.836-13.507
        c3.447-3.679,8.123-5.705,13.164-5.705h19.444l-3.805,10.147c-1.341,1.919-9.789,12.567-33.173,16.218L363.499,273.383z
         M421.64,332.467c-0.606,9.317-5.852,17.565-14.034,22.065c-8.209,4.515-18.01,4.515-26.219,0
        c-8.181-4.5-13.427-12.748-14.035-22.065l-2.054-31.503c19.356-2.663,31.783-9.313,39.425-15.428
        c1.496,1.093,3.178,2.122,5.042,3.085c3.284,1.696,8.039,3.378,14.402,5.094L421.64,332.467z M419.129,270.499
        c-0.892-0.461-1.563-0.871-2.068-1.215l3.546-9.457c0.016,0.017,0.034,0.032,0.05,0.048c3.334,3.56,5.051,8.164,4.863,13.015
        C421.961,271.801,420.085,270.992,419.129,270.499z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M511.836,469.741l-4.305-23.764c-5.271-29.095-28.322-52.317-57.358-57.784c-4.386-0.826-8.868-1.244-13.325-1.244
        h-12.965c-2.705,0-5.299,1.075-7.212,2.987l-22.174,22.174l-22.173-22.174c-1.912-1.912-4.507-2.987-7.212-2.987h-12.965
        c-4.457,0-8.941,0.419-13.325,1.244c-29.036,5.467-52.086,28.688-57.357,57.785l-4.305,23.764
        c-0.539,2.975,0.27,6.035,2.208,8.355c1.938,2.32,4.805,3.661,7.828,3.661H501.8c3.023,0,5.89-1.341,7.828-3.661
        C511.566,475.776,512.374,472.716,511.836,469.741z M299.407,461.362v-0.001l2.128-11.746
        c3.775-20.834,20.275-37.461,41.061-41.374c3.144-0.592,6.357-0.892,9.551-0.892h8.741l26.398,26.399
        c1.912,1.912,4.507,2.987,7.212,2.987s5.299-1.075,7.212-2.987l26.399-26.399h8.741c3.193,0,6.407,0.3,9.551,0.892
        c20.785,3.913,37.287,20.541,41.061,41.374l2.128,11.747H299.407z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M227.873,78.311h-6.137c-5.633,0-10.199,4.566-10.199,10.199c0,5.633,4.566,10.199,10.199,10.199h6.137
        c5.633,0,10.199-4.566,10.199-10.199C238.072,82.877,233.506,78.311,227.873,78.311z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M185.94,78.311H77.525c-5.633,0-10.199,4.566-10.199,10.199c0,5.633,4.566,10.199,10.199,10.199H185.94
        c5.633,0,10.199-4.566,10.199-10.199C196.139,82.877,191.573,78.311,185.94,78.311z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M227.873,119.222H77.525c-5.633,0-10.199,4.566-10.199,10.199c0,5.633,4.566,10.199,10.199,10.199h150.347
        c5.633,0,10.199-4.566,10.199-10.199C238.072,123.788,233.506,119.222,227.873,119.222z"/>
        </g>
      </g>
    </svg>
  );
}


export const DownArrow = ({ className }) => {
  return (
    <svg viewBox="0 0 960 560" className={className}>
      <g>
        <path d="M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937
		c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937
		c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z"/>
      </g>
    </svg>
  );
}

export const BigDice = () => {
  return (
    <svg viewBox="0 0 349.46875 367.09293" >
      <g transform="matrix(1.5714 0 0 1.5714 -362.48 -959.7)">
        <path d="m349.02 610.72 103.99 38.231-128.15 50.755-94.191-52.893 118.35-36.094z" fill="#ececec" fill-rule="evenodd" />
        <path d="m230.89 646.96 95.309 53.024 7.5072 144.34-88.722-70.505-14.095-126.86z" fill="#b3b3b3" fill-rule="evenodd" />
        <path d="m453.06 648.98-128.2 50.339 8.7255 144.98 111.42-62.421 8.0543-132.9z" fill="#808080" fill-rule="evenodd" />
        <path transform="matrix(.90106 .4337 -.4337 .90106 348.57 -86.829)" d="m377.21 723.81c0.00286 11.68-6.008 21.151-13.424 21.151s-13.427-9.4708-13.424-21.151 6.008-21.151 13.424-21.151 13.427 9.4708 13.424 21.151z" />
        <path transform="matrix(.90106 .4337 -.4337 .90106 408.97 -112)" d="m377.21 723.81c0.00286 11.68-6.008 21.151-13.424 21.151s-13.427-9.4708-13.424-21.151 6.008-21.151 13.424-21.151 13.427 9.4708 13.424 21.151z" />
        <path transform="matrix(.90106 .4337 -.4337 .90106 407.63 -42.866)" d="m377.21 723.81c0.00286 11.68-6.008 21.151-13.424 21.151s-13.427-9.4708-13.424-21.151 6.008-21.151 13.424-21.151 13.427 9.4708 13.424 21.151z" />
        <path transform="matrix(.90106 .4337 -.4337 .90106 349.24 -15.347)" d="m377.21 723.81c0.00286 11.68-6.008 21.151-13.424 21.151s-13.427-9.4708-13.424-21.151 6.008-21.151 13.424-21.151 13.427 9.4708 13.424 21.151z" />
        <path transform="matrix(-.64716 .51168 .43938 .85613 217.29 -91.126)" d="m377.21 723.81c0.00286 11.68-6.008 21.151-13.424 21.151s-13.427-9.4708-13.424-21.151 6.008-21.151 13.424-21.151 13.427 9.4708 13.424 21.151z" />
        <path transform="matrix(-.64716 .51168 .43938 .85613 220.11 -47.455)" d="m377.21 723.81c0.00286 11.68-6.008 21.151-13.424 21.151s-13.427-9.4708-13.424-21.151 6.008-21.151 13.424-21.151 13.427 9.4708 13.424 21.151z" />
        <path transform="matrix(-.64716 .51168 .43938 .85613 222.79 -5.8276)" d="m377.21 723.81c0.00286 11.68-6.008 21.151-13.424 21.151s-13.427-9.4708-13.424-21.151 6.008-21.151 13.424-21.151 13.427 9.4708 13.424 21.151z" />
        <path transform="matrix(-.59593 .48508 .4046 .81162 176.71 -76.72)" d="m377.21 723.81c0.00286 11.68-6.008 21.151-13.424 21.151s-13.427-9.4708-13.424-21.151 6.008-21.151 13.424-21.151 13.427 9.4708 13.424 21.151z" />
        <path transform="matrix(-.54469 .49395 .36981 .82646 188.42 -50.021)" d="m377.21 723.81c0.00286 11.68-6.008 21.151-13.424 21.151s-13.427-9.4708-13.424-21.151 6.008-21.151 13.424-21.151 13.427 9.4708 13.424 21.151z" />
        <path transform="matrix(-.51054 .423 .34662 .70776 197.46 99.989)" d="m377.21 723.81c0.00286 11.68-6.008 21.151-13.424 21.151s-13.427-9.4708-13.424-21.151 6.008-21.151 13.424-21.151 13.427 9.4708 13.424 21.151z" />
        <path transform="matrix(.27703 .61136 .84004 -.12619 -423.56 515.22)" d="m377.21 723.81c0.00286 11.68-6.008 21.151-13.424 21.151s-13.427-9.4708-13.424-21.151 6.008-21.151 13.424-21.151 13.427 9.4708 13.424 21.151z" />
        <path transform="matrix(.26167 .54005 .79344 -.11147 -324.84 512.72)" d="m377.21 723.81c0.00286 11.68-6.008 21.151-13.424 21.151s-13.427-9.4708-13.424-21.151 6.008-21.151 13.424-21.151 13.427 9.4708 13.424 21.151z" />
        <path transform="matrix(.2924 -.58759 .88664 .12128 -350.79 774.28)" d="m377.21 723.81c0.00286 11.68-6.008 21.151-13.424 21.151s-13.427-9.4708-13.424-21.151 6.008-21.151 13.424-21.151 13.427 9.4708 13.424 21.151z" />
        <path transform="matrix(.32314 .58759 .97984 -.12128 -488.1 523.02)" d="m377.21 723.81c0.00286 11.68-6.008 21.151-13.424 21.151s-13.427-9.4708-13.424-21.151 6.008-21.151 13.424-21.151 13.427 9.4708 13.424 21.151z" />
        <path transform="matrix(.33338 .63513 1.0109 -.13109 -518.73 535.54)" d="m377.21 723.81c0.00286 11.68-6.008 21.151-13.424 21.151s-13.427-9.4708-13.424-21.151 6.008-21.151 13.424-21.151 13.427 9.4708 13.424 21.151z" />
      </g>
    </svg>
  );
}