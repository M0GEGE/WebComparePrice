document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('resultContainer');
    const data = localStorage.getItem('compareResults');

    if (!data) {
        container.innerHTML = '<p class="error-message">Нет данных для сравнения. Вернитесь на страницу сравнения и нажмите "Сравнение".</p>';
        return;
    }

    try {
        const products = JSON.parse(data);

        if (!products.length) {
            container.innerHTML = '<p class="error-message">Нет товаров для сравнения.</p>';
            return;
        }

        const escape = (text) => {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        };

        let html = '<div class="compare-scroll-wrapper"><div class="compare-items">';

        products.forEach((product, index) => {
            const isFirst = index === 0;
            const isLast = index === products.length - 1;
            const isSingle = products.length === 1;

            let bgClass, label;
            if (isSingle || isFirst) {
                bgClass = 'compare-item-min';
                label = '<span class="compare-label min-label">MIN</span>';
            } else if (isLast) {
                bgClass = 'compare-item-max';
                label = '<span class="compare-label max-label">MAX</span>';
            } else {
                bgClass = 'compare-item-default';
                label = '';
            }

            const safeName = escape(product.name);
            const safePrice = escape(String(product.price));

            html += `
                <div class="compare-item ${bgClass}">
                    <div class="compare-item-content">
                        <div class="compare-name">${safeName}</div>
                        <div class="compare-price">${safePrice} ₽</div>
                        ${label}
                    </div>
                </div>
            `;
        });

        html += '</div></div>';
        container.innerHTML = html;

    } catch {
        container.innerHTML = '<p class="error-message">Ошибка загрузки данных.</p>';
    }
});