export const formatDate = (date) => {
    // Extract month, day, and year from the date
    const monthName = date.toLocaleString("en-US", { month: "short" });
    const dayOfMonth = date.getDate();
    const yearNumber = date.getFullYear();
  
    // Construct and return formatted date string
    return `${dayOfMonth}-${monthName}-${yearNumber}`;
  };
  
  export function formatDateString(dateString) {
    const parsedDate = new Date(dateString);
  
    if (isNaN(parsedDate)) {
      return "Date Not Valid";
    }
  
    const yearNumber = parsedDate.getFullYear();
    const monthNumber = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const dayOfMonth = String(parsedDate.getDate()).padStart(2, "0");
  
    return `${yearNumber}-${monthNumber}-${dayOfMonth}`;
  }
  
  export function initialsFromFullName(name) {
    const nameParts = name.split(" ");
  
    // Extract the first letter of each name part
    const initials = nameParts.slice(0, 2).map(part => part[0].toUpperCase());
  
    // Combine initials into a single string
    return initials.join("");
  }
  
  // Constants for priority styles
  export const PRIORITY_STYLES = {
    high: "text-red-600",
    medium: "text-yellow-600",
    low: "text-blue-600",
  };
  
  // Constants for task type background colors
  export const TASK_STATUS_COLORS = {
    todo: "bg-blue-600",
    "in progress": "bg-yellow-600",
    completed: "bg-green-600",
  };
  
  // Array of background color classes
  export const BACKGROUND_COLORS = [
    "bg-blue-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-green-600",
  ];  