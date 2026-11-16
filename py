
from abc import ABC, abstractmethod


# 1. SUBJECT CLASS
class Subject(ABC):

    @abstractmethod
    def registerobserver(self, observer):
        pass

    @abstractmethod
    def removeobserver(self, observer):
        pass

    @abstractmethod
    def notifyobserver(self):
        pass


# 2. OBSERVER CLASS
class Observer(ABC):

    @abstractmethod
    def update(self):
        pass


# 3. CONCRETE SUBJECT CLASS
class ConcreteSubject(Subject):

    def __init__(self):
        self.subjectstate = None
        self.observers = []

    def registerobserver(self, observer):
        self.observers.append(observer)
        print("Observer registered successfully!")

    def removeobserver(self, observer):
        if observer in self.observers:
            self.observers.remove(observer)
            print("Observer removed successfully!")

    def notifyobserver(self):
        for observer in self.observers:
            observer.update()

    def getstate(self):
        return self.subjectstate

    def setstate(self, s):
        self.subjectstate = s
        print("\nSubject state changed:", s)
        self.notifyobserver()


# 4. CONCRETE OBSERVER CLASS
class ConcreteObserver(Observer):

    def __init__(self, subject):
        self.subject = subject
        self.observerstate = None

    def update(self):
        self.observerstate = self.subject.getstate()
        print("Observer received update:", self.observerstate)


# MAIN PROGRAM
if __name__ == "__main__":

    # Create subject
    subject = ConcreteSubject()

    # Create observers
    observer1 = ConcreteObserver(subject)
    observer2 = ConcreteObserver(subject)

    # Register observers
    subject.registerobserver(observer1)
    subject.registerobserver(observer2)

    # Change subject state
    subject.setstate("Order Placed")

    subject.setstate("Food Preparing")

    subject.setstate("Out for Delivery")

    subject.setstate("Delivered")

    # Remove one observer
    subject.removeobserver(observer2)

    # Change state again
    subject.setstate("Order Completed")
