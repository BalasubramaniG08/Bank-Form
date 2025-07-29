let customers = [];

document
  .getElementById("customerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (customers.length >= 3) {
      alert("Only 3 customers allowed!");
      return;
    }

    const name = document.getElementById("name").value;
    const account = document.getElementById("account").value;
    const balance = parseFloat(document.getElementById("balance").value);

    customers.push({ name, account, balance });
    displayCustomers();

    this.reset();
  });

function displayCustomers() {
  const container = document.getElementById("customerDetails");
  container.innerHTML = "";
  customers.forEach((cust, index) => {
    container.innerHTML += `
      <div>
        <strong>Customer ${index + 1}</strong><br/>
        Name: ${cust.name}<br/>
        Account #: ${cust.account}<br/>
        Balance: ₹${cust.balance.toFixed(2)}
      </div>
    `;
  });
}

function deposit() {
  const amount = parseFloat(document.getElementById("depositAmount").value);
  const outbox = document.getElementById("depositOut");

  if (!customers[0]) return (outbox.innerText = "Customer 1 not found!");
  if (isNaN(amount) || amount <= 0)
    return (outbox.innerText = "Enter valid amount.");

  customers[0].balance += amount;
  outbox.innerText = `₹${amount} deposited. New Balance: ₹${customers[0].balance.toFixed(
    2
  )}`;
  displayCustomers();
}

function withdraw() {
  const amount = parseFloat(document.getElementById("withdrawAmount").value);
  const outbox = document.getElementById("withdrawOut");

  if (!customers[1]) return (outbox.innerText = "Customer 2 not found!");
  if (isNaN(amount) || amount <= 0)
    return (outbox.innerText = "Enter valid amount.");
  if (amount > customers[1].balance)
    return (outbox.innerText = "Insufficient balance.");

  customers[1].balance -= amount;
  outbox.innerText = `₹${amount} withdrawn. New Balance: ₹${customers[1].balance.toFixed(
    2
  )}`;
  displayCustomers();
}

function checkBalance() {
  const outbox = document.getElementById("balanceOut");

  if (!customers[2]) return (outbox.innerText = "Customer 3 not found!");
  outbox.innerText = `Current Balance: ₹${customers[2].balance.toFixed(2)}`;
}
