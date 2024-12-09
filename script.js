document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidebar ul li a");
    const sections = document.querySelectorAll(".section");

    // Функция для переключения разделов
    const switchSection = (event, sectionId) => {
        event.preventDefault();
        console.log(`Switching to section: ${sectionId}`); // Логируем переключение

        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove("hidden");
                console.log(`Showing section: ${sectionId}`);
            } else {
                section.classList.add("hidden");
                console.log(`Hiding section: ${section.id}`);
            }
        });
    };

    // Привязываем обработчики событий
    links.forEach(link => {
        const sectionId = link.getAttribute("data-section");

        // Обрабатываем как click, так и touchstart
        link.addEventListener("click", (event) => {
            console.log("Click event triggered");
            switchSection(event, sectionId);
        });
        link.addEventListener("touchstart", (event) => {
            console.log("Touch event triggered");
            switchSection(event, sectionId);
        });
    });
});
