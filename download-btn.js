const download = document.getElementById("download");

download.addEventListener("click", () => {
  setTimeout(() => {
    const budget = parseFloat(document.getElementById("amount").textContent);
    const listContainer = document.getElementById("list");
    const csvContent = [["Product", "Expenses", "Percentage"]];
    let totalExpenses = 0;

    // Create a CSV content from the expense list
    [...listContainer.children].forEach((item) => {
      const product = item.querySelector(".product").textContent;
      const expenses = item.querySelector(".amount").textContent;

      totalExpenses += parseFloat(expenses);
      csvContent.push([product, expenses, (expenses / totalExpenses * 100).toFixed(2) + '%']);
    });

    // Add a row for the total expenses
    csvContent.push(["", "Total", totalExpenses]);

    // Add a row for the balance
    csvContent.push(["", "Balance", budget - totalExpenses]);

    const csvData = new Blob([csvContent.map(row => row.join(',')).join('\n')], { type: 'text/csv' });
    const encodedUri = URL.createObjectURL(csvData);

    const link = document.createElement("a");
    link.setAttribute("download", "expenses.csv");
    link.href = encodedUri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(encodedUri);
  }, 100); // Delay by 100ms
});