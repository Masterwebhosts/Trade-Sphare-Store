(() => {
  const basePrice = 100;
  const addons = [...document.querySelectorAll('.addon')];
  const totalEl = document.getElementById('total');
  const formTotalEl = document.getElementById('form-total');
  const countEl = document.getElementById('addon-count');
  const addonTotalEl = document.getElementById('addon-total');

  function getSelection() {
    const selected = addons.filter(item => item.checked);
    const extras = selected.reduce((sum, item) => sum + Number(item.value), 0);
    return { selected, extras, total: basePrice + extras };
  }

  function updatePrice() {
    const { selected, extras, total } = getSelection();
    totalEl.textContent = `$${total}`;
    formTotalEl.textContent = `$${total}`;
    countEl.textContent = String(selected.length);
    addonTotalEl.textContent = `$${extras}`;
  }

  addons.forEach(item => item.addEventListener('change', updatePrice));

  document.getElementById('order-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const { selected, total } = getSelection();
    const data = new FormData(form);
    const lines = [
      'مرحباً Trade Sphare، أريد طلب إنشاء متجر إلكتروني.',
      '',
      `الاسم / النشاط: ${data.get('name')}`,
      `رقم التواصل: ${data.get('phone')}`,
      `نوع النشاط: ${data.get('business') || 'لم يحدد'}`,
      '',
      'الخدمة: متجر إلكتروني أساسي — $100',
      'الإضافات:',
      ...(selected.length ? selected.map(item => `- ${item.dataset.title} (+$50)`) : ['- لا توجد إضافات']),
      '',
      `السعر التقديري الإجمالي: $${total}`,
      '',
      `ملاحظات: ${data.get('notes') || 'لا توجد'}`,
      '',
      'أرجو التواصل معي لتأكيد التفاصيل والسعر النهائي.'
    ];
    const message = encodeURIComponent(lines.join('\n'));
    const whatsappNumber = '963932224359';
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  });

  updatePrice();
})();