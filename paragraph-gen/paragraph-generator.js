const text = [
    'Jelly sweet roll jelly beans biscuit pie macaron chocolate donut.',
    'Carrot cake caramels pie sweet apple pie tiramisu carrot cake.',
    'Marzipan marshmallow croissant tootsie roll lollipop.',
    'Cupcake lemon drops bear claw gummies.',
    'Jelly bear claw gummi bears lollipop cotton candy gummi bears chocolate bar cake cookie.',
    'Cupcake muffin danish muffin cookie gummies.',
    'Jelly beans tiramisu pudding.',
    'Toffee soufflé chocolate cake pastry brownie.',
    'Oat cake halvah sweet roll cotton candy croissant lollipop.',
    'Marzipan tiramisu chocolate bar candy candy carrot cake jelly sweet.',
  ];
  
  const paragraphs = document.getElementById('paragraphs');
  const generateBtn = document.getElementById('generate');
  const textContainer = document.getElementById('text');
  
  generateBtn.addEventListener('click', () => {
    const amount = parseInt(paragraphs.value);
    const generatedText = text.slice(0, amount).join(' ');
    textContainer.innerHTML = `<p>${generatedText}</p>`;
  });
  