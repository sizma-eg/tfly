```javascript
'use strict';

// مفاجأة الصفحة الرئيسية
const surpriseButton = document.getElementById('surpriseButton');
const surprise = document.getElementById('surprise');

if (surpriseButton && surprise) {
  surpriseButton.addEventListener('click', () => {
    surprise.hidden = !surprise.hidden;
  });
}

// القصص التفاعلية
const stories = {
  friendship: {
    title: 'صاحب جديد في الغابة',
    paragraphs: [
      'في صباح جميل، كان فوفو الثعلب بيلعب بكورته جنب شجرة كبيرة. سمع صوتًا هاديًا بيقول: ممكن ألعب معاك؟',
      'بص فوفو، لقى أرنب صغير واقف بعيد شوية. كان متردد لأنه لسه ما يعرفش حد في الغابة.',
      'ابتسم فوفو وقال: طبعًا! تعالى نلعب سوا. قسموا اللعب بينهم، وكل واحد اقترح لعبة جديدة.',
      'قبل ما الشمس تغيب، عرف الأرنب إن كلمة لطيفة ممكن تبدأ صداقة جميلة.'
    ],
    moral: 'المعنى الجميل: المشاركة والكلام اللطيف بيساعدونا نكوّن صداقات. 💚'
  },

  different: {
    title: 'ألواننا بتكمّل بعض',
    paragraphs: [
      'قررت حيوانات الغابة تعمل احتفالًا كبيرًا، وكل واحد هيشارك بحاجة بيحبها.',
      'اختلف الأصدقاء في اختيار ألوان الزينة، وكل واحد كان شايف إن اختياره هو الأجمل.',
      'اقترح العصفور إنهم يستخدموا كل الألوان. جربوا الفكرة، وبقت الزينة أجمل مما تخيلوا.',
      'عرف الأصدقاء إن كل واحد مختلف ومميز، وإن التعاون بيخلّي النتيجة أحلى.'
    ],
    moral: 'المعنى الجميل: اختلافنا شيء جميل، وكل شخص يستحق الاحترام. 🌈'
  },

  try: {
    title: 'الدب الصغير بيحاول',
    paragraphs: [
      'كان الدب الصغير عايز يبني برجًا من المكعبات، لكن البرج كان بيقع كل مرة.',
      'زعل شوية، وأخذ نفسًا هاديًا، وبعدها طلب من أخته تساعده.',
      'بدأوا يحطوا المكعبات الكبيرة تحت والصغيرة فوق، والمرة دي البرج وقف!',
      'فرح الدب وعرف إنه مش لازم ينجح من أول مرة، وإن طلب المساعدة شجاعة.'
    ],
    moral: 'المعنى الجميل: خُد وقتك، جرّب تاني، واطلب المساعدة لما تحتاجها. ⭐'
  }
};

const storyReader = document.getElementById('storyReader');

if (storyReader) {
  const title = document.getElementById('storyTitle');
  const text = document.getElementById('storyText');
  const moral = document.getElementById('storyMoral');

  document.querySelectorAll('.read-story').forEach(button => {
    button.addEventListener('click', () => {
      const story = stories[button.dataset.story];
      if (!story) return;

      title.textContent = story.title;
      text.replaceChildren();

      story.paragraphs.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        text.appendChild(p);
      });

      moral.textContent = story.moral;
      storyReader.hidden = false;

      storyReader.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  document.getElementById('closeStory').addEventListener('click', () => {
    storyReader.hidden = true;
  });
}

// لعبة الذاكرة
const memoryBoard = document.getElementById('memoryBoard');

if (memoryBoard) {
  const symbols = [
    '🍓', '🌙', '⭐', '🌈',
    '🍓', '🌙', '⭐', '🌈'
  ];

  const message = document.getElementById('memoryMessage');
  const panel = document.getElementById('memoryPanel');

  let firstCard = null;
  let secondCard = null;
  let locked = false;
  let matched = 0;
  let timer = null;

  function shuffle(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }

  function hideCard(card) {
    if (!card) return;

    card.textContent = '؟';
    card.classList.remove('revealed');
    card.setAttribute('aria-label', 'كارت مخفي');
  }

  function revealCard(card) {
    card.textContent = card.dataset.symbol;
    card.classList.add('revealed');
    card.setAttribute('aria-label', 'صورة ' + card.dataset.symbol);
  }

  function resetMemory() {
    clearTimeout(timer);

    firstCard = null;
    secondCard = null;
    locked = false;
    matched = 0;

    message.textContent = 'اختار كارتين وركز في الصور.';
    memoryBoard.replaceChildren();

    shuffle(symbols).forEach(symbol => {
      const card = document.createElement('button');

      card.type = 'button';
      card.className = 'memory-card';
      card.textContent = '؟';
      card.dataset.symbol = symbol;
      card.setAttribute('aria-label', 'كارت مخفي');

      card.addEventListener('click', () => {
        if (
          locked ||
          card.classList.contains('matched') ||
          card === firstCard
        ) {
          return;
        }

        revealCard(card);

        if (!firstCard) {
          firstCard = card;
          return;
        }

        secondCard = card;

        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
          firstCard.classList.add('matched');
          secondCard.classList.add('matched');

          firstCard.disabled = true;
          secondCard.disabled = true;

          firstCard = null;
          secondCard = null;
          matched += 2;

          message.textContent = matched === symbols.length
            ? 'برافو عليك! لقيت كل الأزواج! 🎉'
            : 'شاطر! لقيت صورتين شبه بعض. كمّل!';

          return;
        }

        locked = true;
        message.textContent = 'مش مشكلة! ركز وجرب تاني. 💛';

        timer = setTimeout(() => {
          hideCard(firstCard);
          hideCard(secondCard);

          firstCard = null;
          secondCard = null;
          locked = false;
        }, 850);
      });

      memoryBoard.appendChild(card);
    });
  }

  document.getElementById('showMemory').addEventListener('click', () => {
    panel.hidden = false;

    panel.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

  document.getElementById('resetMemory').addEventListener(
    'click',
    resetMemory
  );

  resetMemory();
}

// لعبة الألوان
const colorBoard = document.getElementById('colorBoard');

if (colorBoard) {
  const palette = [
    { name: 'الأزرق', color: '#7d9ef8' },
    { name: 'الوردي', color: '#f48eb7' },
    { name: 'الأصفر', color: '#ffcf57' },
    { name: 'الأخضر', color: '#66ce9a' }
  ];

  const target = document.getElementById('colorTarget');
  const message = document.getElementById('colorMessage');
  const panel = document.getElementById('colorsPanel');

  let currentColor;

  function newRound() {
    currentColor = palette[
      Math.floor(Math.random() * palette.length)
    ];

    target.textContent = currentColor.name;
    message.textContent = 'اختار الدائرة اللي لونها زي المطلوب.';
    colorBoard.replaceChildren();

    const options = [...palette].sort(() => Math.random() - 0.5);

    options.forEach(option => {
      const button = document.createElement('button');

      button.type = 'button';
      button.className = 'color-option';
      button.style.background = option.color;
      button.setAttribute('aria-label', option.name);

      button.addEventListener('click', () => {
        colorBoard.querySelectorAll('button').forEach(item => {
          item.classList.remove('correct', 'wrong');
        });

        if (option.name === currentColor.name) {
          button.classList.add('correct');
          message.textContent = 'برافو! ده اللون الصح! 🎉';
        } else {
          button.classList.add('wrong');
          message.textContent = 'قريب! جرّب تاني، مفيش مشكلة. 💛';
        }
      });

      colorBoard.appendChild(button);
    });
  }

  document.getElementById('showColors').addEventListener('click', () => {
    panel.hidden = false;
    newRound();

    panel.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

  document.getElementById('newColor').addEventListener('click', newRound);

  newRound();
}
```
