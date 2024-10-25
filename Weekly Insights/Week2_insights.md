# Week 2 Learning Report

## Challenges and Solutions

### Challenges
1. **Dynamic Content Management**:
   - Faced issues with updating the feedback table in real time.

2. **User Input Handling**:
   - Needed to manage multiple input types (checkboxes, radio buttons, text areas) to ensure accurate data capture.

3. **Product Management System**:
   - Encountered challenges in managing product data effectively, including adding, updating, and removing products.

### Solutions
1. **Dynamic Content Management**:
   - Upgraded the feedback system to utilize local storage for storing feedback entries, allowing for immediate updates to the feedback table.

2. **User Input Handling**:
   - Implemented event listeners for all input fields and grouped similar inputs (checkboxes, radio buttons) for streamlined data collection.

3. **Product Management System**:
   - Developed a TypeScript-based system for managing product data, which included functions for adding, updating, and removing products.

## Code Base

The code base includes an HTML document with embedded CSS for styling and JavaScript for functionality. Key components are:
- A feedback form for user submissions.
- A live update feature to reflect user inputs in real-time.
- A feedback table that dynamically retrieves and displays data from local storage.
- Interactive video selection options.

Additionally, I developed a basic product management system using TypeScript, allowing for easier handling of product data and improving type safety in the code.

### Key Code Sections
- **HTML Structure**:
    ```html
    <form class="form-container" onsubmit="return handleSubmit(event)">
        <!-- Form fields here -->
    </form>
    ```

- **JavaScript Functionality**:
    ```javascript
    function handleSubmit(event) {
        // Collect and store feedback data
    }
- **TypeScript**:
    ```typescript
    interface Product {
        id: number;
        name: string;
        price: number;
    }

    const products: Product[] = [];
    // Functions for adding, removing, and updating products
    ```
    ```typescript
    // Use a unique key for each feedback entry
            localStorage.setItem(`feedback_${feedbackCount}`, JSON.stringify(feedbackData));
            feedbackCount++; // Increment the counter```

## Basic Git Commands

Here are some essential Git commands I learned:

- **Initialize a Repository**:
    ```bash
    git init
    ```

- **Clone a Repository**:
    ```bash
    git clone <repository-url>
    ```

- **Check Status**:
    ```bash
    git status
    ```

- **Add Changes**:
    ```bash
    git add .  # Adds all changes
    ```

- **Commit Changes**:
    ```bash
    git commit -m "Your commit message"
    ```


- **View Commit History**:
    ```bash
    git log
    ```

## Scope of Improvement

1. **Code Optimization**:
   - Refactor JavaScript code sections for better maintainability.


2. **Improved Styling**:
   - Explore advanced CSS techniques or frameworks for a more polished design.

## Strengths

- **Problem-Solving**:
  - Effectively identified challenges and implemented solutions to improve the project.

- **Attention to Detail**:
  - Ensured user inputs were accurately captured and displayed without errors.

- **Adaptability**:
  - Quickly learned and applied new concepts such as local storage, event handling in JavaScript, and TypeScript.

## Looking Forward

- **Collaboration**:
  - Engage more with peers to share knowledge and best practices in web development.

- **Project Expansion**:
  - Consider adding features like user authentication or data analytics to enhance functionality and user engagement.

In week 1, I designed the feedback form, and in week 2, I upgraded it by integrating local storage for data management and implementing live dynamic typing to improve user experience. Additionally, I created a basic product management system using TypeScript, enhancing my understanding of type safety and data management.
