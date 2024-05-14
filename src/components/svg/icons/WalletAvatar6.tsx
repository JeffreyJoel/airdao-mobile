import React from 'react';
import { Defs, Path, Svg, ClipPath, G } from 'react-native-svg';
import { IconProps } from './Icon.types';

export function WalletAvatar6(props: Omit<IconProps, 'color'>) {
  const { scale = 1 } = props;
  const width = 128;
  const height = 128;
  return (
    <Svg
      width={width * scale}
      height={height * scale}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <G clipPath="url(#prefix__clip0_1387_111)">
        <Path fill="#E6E6E6" d="M.693.478h126.694v128.478H.693z" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M72.83-8.58c0-2.075 1.089-4 2.867-5.069l82.473-49.594c9.995-6.011 5.734-21.367-5.93-21.367H62.588a8.195 8.195 0 01-8.195-8.195A8.195 8.195 0 0046.198-101H-6.443c-8.145 0-13.711 8.23-10.68 15.789L13.084-9.889a11.506 11.506 0 0010.68 7.223h18.338-43.805c-6.355 0-11.506 5.152-11.506 11.507v53.756c0 10.906 13.758 15.693 20.527 7.142l24.584-31.053c5.89-7.441 17.818-4.306 19.289 5.07l4.67 29.77c1.632 10.402 16.97 9.206 16.97-1.323 0-9.395 12.963-11.897 16.46-3.178l7.788 19.42a11.506 11.506 0 0010.679 7.224h19.123c6.355 0 11.506-5.152 11.506-11.507V8.841c0-6.355-5.151-11.507-11.506-11.507H78.745a5.915 5.915 0 01-5.914-5.914z"
          fill="#FF5E0D"
        />
        <Path
          d="M97.079 88.445l2.484-.996-2.484.996zm-7.788-19.42l-2.485.997 2.485-.997zM13.084-9.889l-2.484.996 2.484-.996zm62.613-3.76l1.38 2.294-1.38-2.294zm-1.379-2.294l82.472-49.594 2.759 4.587-82.472 49.595-2.759-4.588zm77.922-65.99H62.588v-5.354h89.652v5.354zM46.198-98.323H-6.443v-5.354h52.641v5.354zm-60.837 12.116L15.57-10.886 10.6-8.893l-30.207-75.322 4.968-1.992zM23.764-5.343h18.338V.011H23.764v-5.354zM42.102.011H-1.703v-5.353h43.805V.01zm-52.635 8.83v53.756h-5.353V8.841h5.353zM5.22 68.078l24.584-31.053L34 40.347 9.417 71.4l-4.198-3.322zM53.835 43.34l4.67 29.77-5.288.83-4.67-29.77 5.288-.83zm37.94 24.688l7.788 19.42-4.969 1.993-7.788-19.42 4.969-1.993zm15.983 24.963h19.123v5.353h-19.123v-5.353zm27.953-8.83V8.841h5.353v75.321h-5.353zm-8.83-84.15H78.745v-5.354h48.136V.01zm-48.136 0a8.591 8.591 0 01-8.59-8.592h5.352a3.238 3.238 0 003.238 3.238V.01zm56.966 8.829a8.83 8.83 0 00-8.83-8.83v-5.353c7.833 0 14.183 6.35 14.183 14.183h-5.353zm-8.83 84.15a8.83 8.83 0 008.83-8.829h5.353c0 7.833-6.35 14.183-14.183 14.183v-5.353zM99.563 87.45a8.83 8.83 0 008.195 5.543v5.353a14.182 14.182 0 01-13.163-8.903l4.968-1.993zM70.154 72.203c0-12.34 17.027-15.628 21.621-4.174l-4.969 1.993c-2.4-5.986-11.299-4.268-11.299 2.181h-5.353zm-11.649.908c1.12 7.14 11.65 6.32 11.65-.908h5.352c0 13.83-20.147 15.402-22.29 1.738l5.288-.83zM29.803 37.025c7.34-9.271 22.2-5.365 24.032 6.316l-5.288.83C47.437 37.1 38.443 34.736 34 40.347l-4.197-3.322zm-40.336 25.572c0 8.37 10.558 12.042 15.752 5.48L9.417 71.4c-8.344 10.54-25.303 4.64-25.303-8.803h5.353zM-1.703.011a8.83 8.83 0 00-8.83 8.83h-5.353c0-7.833 6.35-14.183 14.183-14.183V.01zm46.482-2.677A2.677 2.677 0 0142.102.011v-5.353a2.676 2.676 0 00-2.676 2.676h5.353zm-2.677-2.677c1.47 0 2.677 1.19 2.677 2.677h-5.353A2.676 2.676 0 0042.102.011v-5.354zM15.57-10.886a8.83 8.83 0 008.195 5.543V.011A14.183 14.183 0 0110.6-8.893l4.969-1.993zM-6.443-98.323c-6.25 0-10.522 6.315-8.196 12.116l-4.968 1.992c-3.737-9.318 3.124-19.462 13.164-19.462v5.354zm58.16 5.518a5.518 5.518 0 00-5.519-5.518v-5.354c6.004 0 10.872 4.868 10.872 10.872h-5.354zm10.87 10.872c-6.003 0-10.87-4.868-10.87-10.872h5.353a5.518 5.518 0 005.518 5.518v5.354zm94.203 16.396c7.671-4.613 4.401-16.396-4.55-16.396v-5.354c14.377 0 19.63 18.928 7.309 26.337l-2.759-4.587zM77.077-11.355a3.238 3.238 0 00-1.57 2.775h-5.353a8.59 8.59 0 014.164-7.363l2.759 4.588z"
          fill="#191919"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M94.09 123.592c-5.474 0-9.222-5.519-7.205-10.606l17.506-44.14c3.904-9.846-6.802-19.092-15.974-13.797L45.729 79.695c-5.344 3.086-7.175 9.92-4.09 15.264l15.246 26.406a11.173 11.173 0 01-1.632 13.341L35.944 154.74c-5.736 5.951-3.248 15.855 4.62 18.389l71.415 23.004c6.258 2.016 12.665-2.651 12.665-9.225 0-5.353 4.339-9.693 9.692-9.693h11.691c6.171 0 11.173-5.002 11.173-11.173V87.027c0-6.171-5.002-11.174-11.173-11.174h-20.213a11.174 11.174 0 00-10.393 7.07l-14.124 35.766a7.749 7.749 0 01-7.208 4.903z"
          fill="#457EFF"
        />
        <Path
          d="M101.297 118.689l-2.49-.983 2.49.983zm14.124-35.766l-2.489-.983 2.489.983zm-74.857 90.206l-.82 2.548.82-2.548zm16.32-51.764l-2.317 1.338 2.318-1.338zm30.001-8.379l-2.488-.987 2.488.987zm17.506-44.14l-2.488-.987 2.488.986zm-2.488-.987l-17.506 44.14 4.976 1.973 17.506-44.14-4.976-1.973zM47.067 82.013l42.688-24.646-2.676-4.636L44.39 77.377l2.676 4.636zm12.136 38.014L43.957 93.62l-4.636 2.677 15.246 26.406 4.636-2.676zm-21.331 36.57l19.309-20.033-3.855-3.715-19.309 20.033 3.855 3.715zm74.928 36.989l-71.415-23.004-1.642 5.095 71.416 23.004 1.641-5.095zm33.227-19.047h-11.691v5.353h11.691v-5.353zm8.497-87.512v79.015h5.353V87.027h-5.353zm-28.71-8.497h20.213v-5.353h-20.213v5.353zm-22.027 41.142l14.124-35.766-4.979-1.966-14.124 35.766 4.979 1.966zm-4.98-1.966a5.073 5.073 0 01-4.718 3.21v5.353c4.28 0 8.126-2.616 9.698-6.597l-4.98-1.966zm27.007-44.53a13.85 13.85 0 00-12.882 8.764l4.979 1.966a8.497 8.497 0 017.903-5.376v-5.353zm34.063 13.85c0-7.648-6.201-13.85-13.85-13.85v5.354a8.498 8.498 0 018.497 8.497h5.353zm-13.85 92.866c7.649 0 13.85-6.201 13.85-13.85h-5.353a8.498 8.498 0 01-8.497 8.497v5.353zm-18.707 7.016a7.016 7.016 0 017.016-7.016v-5.353c-6.831 0-12.369 5.538-12.369 12.369h5.353zm-16.161 11.773c7.986 2.572 16.161-3.383 16.161-11.773h-5.353c0 4.759-4.637 8.137-9.167 6.678l-1.641 5.095zm-77.142-45.799c-7.11 7.377-4.027 19.654 5.726 22.795l1.642-5.095c-5.984-1.928-7.876-9.459-3.513-13.985l-3.855-3.715zm20.55-30.179a8.498 8.498 0 01-1.24 10.146l3.854 3.715a13.85 13.85 0 002.022-16.537l-4.636 2.676zM44.39 77.377c-6.625 3.825-8.895 12.296-5.07 18.92l4.636-2.677a8.497 8.497 0 013.11-11.607l-2.676-4.636zm40.006 34.622c-2.714 6.844 2.329 14.27 9.692 14.27v-5.353c-3.582 0-6.036-3.613-4.716-6.944l-4.976-1.973zm22.482-42.167c4.839-12.203-8.431-23.665-19.8-17.1l2.676 4.635c6.975-4.027 15.117 3.005 12.148 10.492l4.976 1.973z"
          fill="#191919"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M177.74 95.08c10.726 3.044 17.847-10.877 9.102-17.794L133.39 35.01c-7.326-5.794-18.106-.576-18.106 8.764v6.283c0 3.992-2.13 7.68-5.587 9.676L66.182 84.857c-5.748 3.318-7.353 10.887-3.446 16.253l2.92 4.012a11.173 11.173 0 011.338 10.735l-17.141 42.741c-2.944 7.341 2.462 15.333 10.37 15.333h32.965c6.17 0 11.174-5.003 11.174-11.174v-.655c0-6.171 5.002-11.174 11.173-11.174h38.06c6.171 0 11.174-5.003 11.174-11.174v-34.871c0-6.762 6.465-11.649 12.971-9.803zm-73.378 43.653a2.233 2.233 0 114.306.832c-.915 2.281-4.306 1.626-4.306-.832z"
          fill="#FF7A00"
        />
        <Path
          d="M49.853 158.598l-2.484-.996 2.484.996zm15.803-53.476l-2.164 1.575 2.164-1.575zm.526-20.265l1.339 2.318-1.339-2.318zm-3.446 16.253l-2.164 1.575 2.164-1.575zm46.961-41.377l-1.338-2.318 1.338 2.318zm22.032-22.623l53.452 42.275 3.321-4.198L135.05 32.91l-3.321 4.199zm-13.768 12.947v-6.283h-5.353v6.283h5.353zm-9.602 7.358L64.844 82.54l2.677 4.636 43.515-25.124-2.677-4.636zm-47.787 45.27l2.92 4.012 4.328-3.151-2.92-4.011-4.328 3.15zm3.938 12.176l-17.141 42.741 4.968 1.992 17.141-42.74-4.968-1.993zm-4.286 61.747h32.964v-5.354H60.224v5.354zm46.814-13.851v-.655h-5.353v.655h5.353zm8.497-9.152h38.06v-5.354h-38.06v5.354zm51.91-13.851v-34.871h-5.353v34.871h5.353zm-61.261-1.186a.345.345 0 01.068-.097.587.587 0 01.17-.127.407.407 0 01.257-.046.407.407 0 01.222.138.61.61 0 01.11.181.354.354 0 01.027.116h-5.353c0 5.404 7.456 6.844 9.467 1.828l-4.968-1.993zm.411-4.745a4.91 4.91 0 00-4.91 4.91h5.353a.443.443 0 01-.443.444v-5.354zm0 5.354a.443.443 0 01-.411-.609l4.968 1.993c1.294-3.226-1.081-6.738-4.557-6.738v5.354zm60.85-34.294c0-4.986 4.768-8.589 9.564-7.228l1.461-5.15c-8.214-2.33-16.378 3.84-16.378 12.378h5.353zm-13.85 48.722c7.649 0 13.85-6.201 13.85-13.851h-5.353a8.497 8.497 0 01-8.497 8.497v5.354zm-46.557 8.497a8.497 8.497 0 018.497-8.497v-5.354c-7.649 0-13.85 6.201-13.85 13.851h5.353zm-13.85 14.506c7.649 0 13.85-6.201 13.85-13.851h-5.353a8.497 8.497 0 01-8.497 8.497v5.354zm-45.82-19.006c-3.649 9.099 3.052 19.006 12.856 19.006v-5.354c-6.015 0-10.125-6.077-7.887-11.66l-4.968-1.992zm16.124-50.905a8.497 8.497 0 011.018 8.164l4.968 1.993a13.852 13.852 0 00-1.658-13.308l-4.327 3.151zm1.352-24.158c-7.125 4.113-9.114 13.495-4.272 20.146l4.328-3.15c-2.971-4.081-1.75-9.837 2.62-12.36l-2.676-4.636zm47.764-32.482c0 3.035-1.62 5.84-4.249 7.358l2.677 4.636a13.851 13.851 0 006.925-11.994h-5.353zm72.573 29.328c6.448 5.1 1.198 15.364-6.711 13.12l-1.461 5.15c13.544 3.843 22.536-13.735 11.493-22.468l-3.321 4.198zM135.05 32.911c-9.081-7.182-22.442-.715-22.442 10.863h5.353c0-7.103 8.197-11.07 13.768-6.664l3.321-4.2z"
          fill="#191919"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_1387_111">
          <Path
            fill="#fff"
            transform="translate(.693 .478)"
            d="M0 0h126.694v128.478H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}