const spinner = (id) => {
  const html = `
    <div class="${id}__loader">
        <div class="${id}__loader-body">
            <div></div>
        </div>
    </div>
    <style type="text/css">
        @keyframes loader-animation {
            0% {
                transform: translate(-50%, -50%) rotate(0deg);
            }

            100% {
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }

        .${id}__loader-body div {
            position: absolute;
            width: 30px;
            height: 30px;
            border: 5px solid #7f28c4;
            border-top-color: transparent;
            border-radius: 50%;
        }

        .${id}__loader-body div {
            animation: loader-animation 1s linear infinite;
            top: 100px;
            left: 100px
        }

        .${id}__loader {
            width: 100%;    
            height: 200px;
            display: inline-block;
            overflow: hidden;
            background: #ffffff;
        }

        .${id}__loader-body {
            width: 100%;
            max-width: 200px;
            margin: 0 auto;
            height: 100%;
            position: relative;
            transform: translateZ(0) scale(1);
            backface-visibility: hidden;
            transform-origin: 0 0;
            /* see note above */
        }

        .${id}__loader-body div {
            box-sizing: content-box;
        }
    </style>
    `;
  return html;
};

export default spinner;
