const progressbar = (progressWidth) => {
  return `
        <div class="WB044__progressbar w-full h-2">
            <div class="w-${progressWidth} h-full bg-black"></div>
        </div>
        `;
};

export default progressbar;
