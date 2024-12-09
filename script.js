document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidebar ul li a");
    const sections = document.querySelectorAll(".section");

    // Функция для переключения разделов
    const switchSection = (event, sectionId) => {
        event.preventDefault();

        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove("hidden");
            } else {
                section.classList.add("hidden");
            }
        });
    };

    // Привязываем обработчики событий
    links.forEach(link => {
        const sectionId = link.getAttribute("data-section");

        // Обрабатываем как click, так и touchstart
        link.addEventListener("click", (event) => switchSection(event, sectionId));
        link.addEventListener("touchstart", (event) => switchSection(event, sectionId)); // Добавляем touchstart
    });
});
