import React from 'react';
import { Defs, Path, Svg, ClipPath, G, Mask } from 'react-native-svg';
import { IconProps } from './Icon.types';

export function WalletAvatar5(props: Omit<IconProps, 'color'>) {
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
      <G clipPath="url(#prefix__clip0_1387_96)">
        <Path fill="#E6E6E6" d="M0 .478h126.694v128.478H0z" />
        <Path
          d="M106.02 30.177c10.495-5.61 23.234 1.745 23.622 13.639l1.14 34.88a16.059 16.059 0 004.921 11.054l25.159 24.186c8.579 8.248 5.521 22.636-5.672 26.681l-32.821 11.863a16.056 16.056 0 00-8.991 8.096L98.15 191.977c-5.193 10.708-19.822 12.246-27.128 2.851l-21.424-27.549a16.059 16.059 0 00-10.478-6.049l-34.57-4.78c-11.79-1.63-17.772-15.067-11.095-24.919l19.58-28.888a16.061 16.061 0 002.516-11.835L9.413 56.453C7.32 44.737 18.252 34.895 29.684 38.2l33.526 9.694a16.06 16.06 0 0012.032-1.264l30.778-16.454z"
          fill="#3568DD"
          stroke="#191919"
          strokeWidth={5.353}
        />
        <Mask id="prefix__a" fill="#fff">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M179.316 71.187c9.445-2.19 11.254-14.853 2.801-19.6L99.758 5.335c-7.077-3.974-15.816 1.14-15.816 9.257V52.14c0 9.511-11.545 14.224-18.2 7.43l-21.54-21.99C37.544 30.786 26 35.498 26 45.01v36.873C26 87.747 30.753 92.5 36.617 92.5h29.617c6.993 0 11.772 7.066 9.17 13.556a9.878 9.878 0 01-9.17 6.202H52.308c-4.337 0-8.24 2.639-9.854 6.665l-20.68 51.568c-2.798 6.975 2.338 14.569 9.853 14.569H62.95c5.863 0 10.616-4.753 10.616-10.617v-9.1c0-5.864 4.754-10.617 10.617-10.617h18.721c5.863 0 10.617-4.754 10.617-10.617v-49.23c0-4.94 3.406-9.227 8.218-10.343l57.578-13.35z"
          />
        </Mask>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M179.316 71.187c9.445-2.19 11.254-14.853 2.801-19.6L99.758 5.335c-7.077-3.974-15.816 1.14-15.816 9.257V52.14c0 9.511-11.545 14.224-18.2 7.43l-21.54-21.99C37.544 30.786 26 35.498 26 45.01v36.873C26 87.747 30.753 92.5 36.617 92.5h29.617c6.993 0 11.772 7.066 9.17 13.556a9.878 9.878 0 01-9.17 6.202H52.308c-4.337 0-8.24 2.639-9.854 6.665l-20.68 51.568c-2.798 6.975 2.338 14.569 9.853 14.569H62.95c5.863 0 10.616-4.753 10.616-10.617v-9.1c0-5.864 4.754-10.617 10.617-10.617h18.721c5.863 0 10.617-4.754 10.617-10.617v-49.23c0-4.94 3.406-9.227 8.218-10.343l57.578-13.35z"
          fill="#FF5E0D"
        />
        <Path
          d="M182.117 51.587l2.621-4.668-2.621 4.668zM99.758 5.335l-2.621 4.668 2.621-4.668zm-2.621 4.668l82.358 46.252 5.243-9.336L102.379.668l-5.242 9.335zM89.296 52.14V14.592H78.589V52.14h10.707zm-19.73 3.683l-21.54-21.989-7.649 7.492 21.54 21.99 7.648-7.493zM20.645 45.01v36.873h10.707V45.01H20.647zm15.97 52.843h29.618V87.147H36.617v10.706zm29.618 9.052H52.308v10.706h13.926v-10.706zm-28.748 10.026l-20.681 51.568 9.937 3.985 20.68-51.568-9.936-3.985zm-5.859 73.482H62.95v-10.706H31.627v10.706zm47.292-15.97v-9.1H68.212v9.1H78.92zm5.263-14.364h18.721v-10.706h-18.72v10.706zm34.691-15.97v-49.23h-10.707v49.23h10.707zm59.234-78.137l-57.578 13.35 2.419 10.43 57.577-13.35-2.418-10.43zm-59.234 28.907a5.264 5.264 0 014.075-5.128l-2.419-10.43a15.97 15.97 0 00-12.363 15.558h10.707zm-15.97 65.2c8.82 0 15.97-7.15 15.97-15.97h-10.707a5.263 5.263 0 01-5.263 5.264v10.706zm-23.984 5.264a5.264 5.264 0 015.263-5.264v-10.706c-8.82 0-15.97 7.15-15.97 15.97H78.92zm-15.97 25.07c8.82 0 15.97-7.15 15.97-15.97H68.212a5.264 5.264 0 01-5.264 5.264v10.706zm-46.144-21.914c-4.208 10.492 3.518 21.914 14.822 21.914v-10.706c-3.726 0-6.272-3.765-4.885-7.223l-9.937-3.985zm35.503-61.594a15.97 15.97 0 00-14.822 10.026l9.937 3.985a5.265 5.265 0 014.885-3.305v-10.706zm18.127-2.841a4.526 4.526 0 01-4.2 2.841v10.706a15.232 15.232 0 0014.137-9.562l-9.937-3.985zm-4.2-6.21c3.203 0 5.392 3.236 4.2 6.21l9.937 3.985c4.013-10.008-3.356-20.902-14.138-20.902v10.706zm-45.588-15.97c0 8.82 7.15 15.97 15.97 15.97V87.146a5.264 5.264 0 01-5.264-5.264H20.647zm27.378-48.05c-10.012-10.22-27.378-3.132-27.378 11.176h10.706c0-4.716 5.724-7.052 9.024-3.683l7.648-7.493zM78.59 52.14c0 4.715-5.724 7.052-9.023 3.683l-7.649 7.492C71.93 73.536 89.296 66.447 89.296 52.14H78.589zm100.906 4.115c4.192 2.353 3.294 8.631-1.388 9.717l2.418 10.43c14.207-3.294 16.929-22.342 4.213-29.483l-5.243 9.336zM102.379.668c-10.645-5.979-23.79 1.715-23.79 13.924h10.707c0-4.024 4.332-6.56 7.84-4.59L102.38.669z"
          fill="#191919"
          mask="url(#prefix__a)"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-14.376-1.913c-5.473 0-9.221-5.52-7.204-10.607l17.506-44.14c3.904-9.845-6.802-19.092-15.974-13.796L-62.736-45.81c-5.344 3.085-7.175 9.919-4.09 15.263L-51.58-4.14A11.174 11.174 0 01-53.212 9.2L-72.52 29.235c-5.737 5.952-3.249 15.856 4.619 18.39L3.515 70.628c6.257 2.016 12.664-2.651 12.664-9.225 0-5.353 4.34-9.693 9.692-9.693h11.69c6.172 0 11.175-5.003 11.175-11.174v-79.014c0-6.172-5.003-11.174-11.174-11.174H17.349a11.174 11.174 0 00-10.393 7.07L-7.168-6.817a7.75 7.75 0 01-7.208 4.903z"
          fill="#EF59B3"
        />
        <Path
          d="M-7.168-6.816l-2.49-.983 2.49.983zM6.956-42.583l-2.49-.983 2.49.983zM-67.9 47.624l-.82 2.548.82-2.548zM-51.58-4.14l-2.318 1.338 2.318-1.338zm30-8.38l-2.488-.987 2.488.987zm17.506-44.14l-2.488-.987 2.488.987zm-2.488-.987l-17.506 44.14 4.977 1.974 17.505-44.14-4.976-1.974zm-54.835 14.155l42.687-24.646-2.676-4.636-42.688 24.646 2.677 4.636zM-49.262-5.48l-15.246-26.406-4.636 2.677 15.246 26.406 4.636-2.677zm-21.331 36.57l19.309-20.033-3.855-3.715-19.309 20.034 3.855 3.715zm74.928 36.99L-67.08 45.075l-1.642 5.096L2.694 73.176l1.641-5.096zm33.227-19.048h-11.69v5.354h11.69v-5.354zm8.497-87.511v79.014h5.353v-79.014H46.06zm-28.71-8.498h20.213v-5.353H17.349v5.353zM-4.678-5.833L9.446-41.6l-4.98-1.967L-9.656-7.799l4.979 1.966zM-9.658-7.8a5.073 5.073 0 01-4.718 3.21V.763c4.28 0 8.126-2.616 9.698-6.597L-9.658-7.8zM17.35-52.33a13.85 13.85 0 00-12.882 8.763l4.979 1.967a8.497 8.497 0 017.903-5.377v-5.353zm34.063 13.85c0-7.649-6.2-13.85-13.85-13.85v5.353a8.497 8.497 0 018.497 8.498h5.353zm-13.85 92.866c7.65 0 13.85-6.201 13.85-13.85H46.06a8.497 8.497 0 01-8.497 8.496v5.354zm-18.707 7.016a7.016 7.016 0 017.016-7.016v-5.354c-6.831 0-12.369 5.538-12.369 12.37h5.353zM2.694 73.175c7.986 2.572 16.161-3.384 16.161-11.773h-5.353c0 4.758-4.637 8.136-9.167 6.677l-1.641 5.096zm-77.142-45.8c-7.11 7.378-4.026 19.654 5.726 22.796l1.642-5.096c-5.984-1.927-7.875-9.458-3.513-13.984l-3.855-3.715zm20.55-30.178a8.497 8.497 0 01-1.24 10.145l3.854 3.715a13.85 13.85 0 002.022-16.537l-4.636 2.677zm-10.176-45.326c-6.625 3.824-8.894 12.295-5.07 18.92l4.636-2.677a8.497 8.497 0 013.11-11.607l-2.676-4.636zm40.006 34.621c-2.714 6.845 2.33 14.27 9.692 14.27V-4.59c-3.582 0-6.036-3.613-4.716-6.943l-4.976-1.974zm22.482-42.166c4.84-12.204-8.431-23.665-19.8-17.101l2.676 4.636c6.975-4.027 15.117 3.005 12.148 10.491l4.976 1.974z"
          fill="#191919"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_1387_96">
          <Path
            fill="#fff"
            transform="translate(0 .478)"
            d="M0 0h126.694v128.478H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
