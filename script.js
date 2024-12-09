document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidebar ul li a");
    const sections = document.querySelectorAll(".section");

    links.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();

            const sectionId = link.getAttribute("data-section");

            sections.forEach(section => {
                if (section.id === sectionId) {
                    section.classList.remove("hidden");
                } else {
                    section.classList.add("hidden");
                }
            });
        });
    });
});
