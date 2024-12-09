document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidebar ul li a");
    const sections = document.querySelectorAll(".section");

    // Функция для переключения секций
    function switchSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove("hidden");
            } else {
                section.classList.add("hidden");
            }
        });
    }

    // Добавляем обработчики событий для клика и касания
    links.forEach(link => {
        // Для клика
        link.addEventListener("click", event => {
            event.preventDefault();
            const sectionId = link.getAttribute("data-section");
            switchSection(sectionId);
        });

        // Для касания (для мобильных устройств)
        link.addEventListener("touchstart", event => {
            event.preventDefault();
            const sectionId = link.getAttribute("data-section");
            switchSection(sectionId);
        });
    });
});
