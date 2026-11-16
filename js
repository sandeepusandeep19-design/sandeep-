
/* =================================
   1. SUBJECT CLASS
================================= */

class Subject {

    registerobserver(observer) {
        throw new Error("Method not implemented");
    }

    removeobserver(observer) {
        throw new Error("Method not implemented");
    }

    notifyobserver() {
        throw new Error("Method not implemented");
    }
}


/* =================================
   2. OBSERVER CLASS
================================= */

class Observer {

    update() {
        throw new Error("Method not implemented");
    }
}


/* =================================
   3. CONCRETE SUBJECT CLASS
================================= */

class ConcreteSubject extends Subject {

    constructor() {
        super();

        this.subjectstate = "Order Placed";
        this.observers = [];
    }

    registerobserver(observer) {

        if (!this.observers.includes(observer)) {

            this.observers.push(observer);

            addNotification(
                "New observer registered successfully!"
            );
        }

        updateObserverCount();
    }

    removeobserver(observer) {

        const index = this.observers.indexOf(observer);

        if (index !== -1) {

            this.observers.splice(index, 1);

            addNotification(
                "Observer removed successfully!"
            );
        }

        updateObserverCount();
    }

    notifyobserver() {

        this.observers.forEach(observer => {
            observer.update();
        });
    }

    getstate() {
        return this.subjectstate;
    }

    setstate(s) {

        this.subjectstate = s;

        console.log("Subject state changed:", s);

        this.notifyobserver();
    }
}


/* =================================
   4. CONCRETE OBSERVER CLASS
================================= */

class ConcreteObserver extends Observer {

    constructor(name, subject) {

        super();

        this.name = name;
        this.subject = subject;
        this.observerstate = null;
    }

    update() {

        this.observerstate =
            this.subject.getstate();

        addNotification(
            this.name +
            " received update: " +
            this.observerstate
        );

        console.log(
            this.name,
            "updated:",
            this.observerstate
        );
    }
}


/* =================================
   5. CREATE SUBJECT AND OBSERVERS
================================= */

const subject = new ConcreteSubject();

const customer = new ConcreteObserver(
    "Customer",
    subject
);

const restaurant = new ConcreteObserver(
    "Restaurant",
    subject
);


// Register observers

subject.registerobserver(customer);
subject.registerobserver(restaurant);


/* =================================
   6. ORDER STATUS MANAGEMENT
================================= */

const orderSteps = [
    "Order Placed",
    "Food Preparing",
    "Ready for Pickup",
    "Out for Delivery",
    "Delivered"
];

const messages = [
    "Your order has been received!",
    "Restaurant is preparing your food.",
    "Your food is ready for pickup.",
    "Your order is on the way!",
    "Your food has been delivered!"
];

let currentStep = 0;


/* =================================
   7. UPDATE ORDER STATUS
================================= */

function nextStatus() {

    if (currentStep >= orderSteps.length - 1) {

        alert("Order has already been delivered!");
        return;
    }

    currentStep++;

    // Change subject state.
    // This automatically notifies observers.

    subject.setstate(orderSteps[currentStep]);

    // Update website interface.

    document.getElementById("orderStatus")
        .innerText = orderSteps[currentStep];

    document.getElementById("statusMessage")
        .innerText = messages[currentStep];

    updateProgress();
}


/* =================================
   8. UPDATE PROGRESS BAR
================================= */

function updateProgress() {

    for (let i = 1; i <= 5; i++) {

        const step = document.getElementById(
            "step" + i
        );

        if (i <= currentStep + 1) {

            step.classList.add("active");

        } else {

            step.classList.remove("active");
        }
    }
}


/* =================================
   9. ADD OBSERVER
================================= */

let observerNumber = 3;

function addObserver() {

    const newObserver = new ConcreteObserver(
        "Observer " + observerNumber,
        subject
    );

    observerNumber++;

    subject.registerobserver(newObserver);
}


/* =================================
   10. REMOVE OBSERVER
================================= */

function removeObserver() {

    if (subject.observers.length === 0) {

        alert("No observers available!");
        return;
    }

    const removed = subject.observers[
        subject.observers.length - 1
    ];

    subject.removeobserver(removed);
}


/* =================================
   11. DISPLAY OBSERVER COUNT
================================= */

function updateObserverCount() {

    document.getElementById("observerCount")
        .innerText =
        "Registered Observers: " +
        subject.observers.length;
}


/* =================================
   12. NOTIFICATION HISTORY
================================= */

function addNotification(message) {

    const notificationBox =
        document.getElementById("notifications");

    // Remove initial waiting message.

    if (
        notificationBox.children.length === 1 &&
        notificationBox.innerText.includes("Waiting")
    ) {
        notificationBox.innerHTML = "";
    }

    const notification = document.createElement("div");

    notification.className = "notification";

    notification.innerText = message;

    notificationBox.prepend(notification);
}


/* =================================
   13. RESET ORDER
================================= */

function resetOrder() {

    currentStep = 0;

    subject.setstate("Order Placed");

    document.getElementById("orderStatus")
        .innerText = "Order Placed";

    document.getElementById("statusMessage")
        .innerText = messages[0];

    updateProgress();
}
