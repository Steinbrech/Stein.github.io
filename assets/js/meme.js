window.onload = () => {
  const imageInput = document.getElementById('image-input');
  const topTextInput = document.getElementById('top-text-input');
  const bottomTextInput = document.getElementById('bottom-text-input');
  const downloadButton = document.getElementById('download-meme');
  const memeImage = document.getElementById('meme-image');
  const textColorInput = document.getElementById('text-color-input');
  const topText = document.getElementById('top-text');
  const bottomText = document.getElementById('bottom-text');
  // 獲取滑塊輸入元素
  const topTextSlider = document.getElementById('top-text-slider');
  const bottomTextSlider = document.getElementById('bottom-text-slider');



  imageInput.addEventListener('change', function () {
    const imageFile = this.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      memeImage.src = e.target.result;
      memeImage.style.display = 'block';
    };

    reader.readAsDataURL(imageFile);
  });

  topTextInput.addEventListener('input', () => {
    topText.textContent = topTextInput.value;
  });

  bottomTextInput.addEventListener('input', () => {
    bottomText.textContent = bottomTextInput.value;
  });

  // 監聽顏色選擇器的變化
  textColorInput.addEventListener('input', () => {
    // 更改文本顏色
    topText.style.color = textColorInput.value;
    bottomText.style.color = textColorInput.value;
  });

  // 更新頂部文字位置的函數
  function updateTopTextPosition() {
    const topText = document.getElementById('top-text');
    // 將滑塊值映射到文字的 `top` 屬性
    topText.style.top = `${topTextSlider.value}%`;
  }

  // 更新底部文字位置的函數
  function updateBottomTextPosition() {
    const bottomText = document.getElementById('bottom-text');
    // 將滑塊值映射到文字的 `bottom` 屬性
    bottomText.style.bottom = `${bottomTextSlider.value}%`;
  }

  // 為滑塊添加事件聽眾
  topTextSlider.addEventListener('input', updateTopTextPosition);
  bottomTextSlider.addEventListener('input', updateBottomTextPosition);


  downloadButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = memeImage.width;
    canvas.height = memeImage.height;
    ctx.drawImage(memeImage, 0, 0, canvas.width, canvas.height);
    ctx.font = '2em Impact';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.textShadow = '2px 2px 0px rgba(0, 0, 0, 0.5)';
    ctx.fillText(topText.textContent, canvas.width / 2, 40);
    ctx.fillText(bottomText.textContent, canvas.width / 2, canvas.height - 20);

    const dataUrl = canvas.toDataURL('image/png');
    downloadButton.href = dataUrl;
    downloadButton.download = 'meme.png';
  });
};