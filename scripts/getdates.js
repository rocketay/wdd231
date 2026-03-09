const year = new Date().getFullYear();
document.getElementById("currentYear").textContent = year;

document.getElementById("lastModified").textContent = document.lastModified;

const menuButton = document.getElementById("menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

const courses = [
    {
        code: "WDD 130",
        name: "Web Fundamentals",
        credits: 2,
        subject: "WDD",
        completed: true
    },
    {
        code: "WDD 131",
        name: "Dynamic Web Fundamentals",
        credits: 2,
        subject: "WDD",
        completed: true
    },
    {
        code: "WDD 231",
        name: "Web Frontend Development I",
        credits: 2,
        subject: "WDD",
        completed: false
    },
    {
        code: "CSE 110",
        name: "Introduction to Programming",
        credits: 2,
        subject: "CSE",
        completed: true
    },
    {
        code: "CSE 111",
        name: "Programming with Functions",
        credits: 2,
        subject: "CSE",
        completed: true
    },
    {
        code: "CSE 210",
        name: "Programming with Classes",
        credits: 2,
        subject: "CSE",
        completed: false
    },
    {
        code: "CSE 121B",
        name: "JavaScript Language",
        credits: 2,
        subject: "CSE",
        completed: false
    }
];

const coursesContainer = document.getElementById("courses");

function displayCourses(courseList) {
    coursesContainer.innerHTML = "";

    courseList.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.textContent = course.code;

        if (course.completed) {
            courseCard.classList.add("completed");
        }

        coursesContainer.appendChild(courseCard);
    });
}

displayCourses(courses);


const allButton = document.getElementById("all");
const wddButton = document.getElementById("wdd");
const cseButton = document.getElementById("cse");

allButton.addEventListener("click", () => {
    displayCourses(courses);
});

wddButton.addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});

cseButton.addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});