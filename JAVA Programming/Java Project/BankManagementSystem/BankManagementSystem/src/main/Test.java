package main;

import java.util.*;

import bank.CurrentAccount;
import bank.LoanAccount;
import bank.SalaryAccount;
import bank.SavingAccount;
import bank.BankAccount;
import dao.InvalidTransactionException;
import dao.Transaction;

public class Test {
    static List<BankAccount> accounts = new ArrayList<>();
    static Scanner sc = new Scanner(System.in);
    static long nextAccountNumber = 1001;

    public static void main(String[] args) {
        System.out.println("----- Welcome to Simple Bank Management System -----");
        seedDemoData();

        int choice = -1;
        while (choice != 7) {
            showMenu();
            try {
                choice = Integer.parseInt(sc.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("Enter valid number.");
            }

            switch (choice) {
                case 1:
                    createAccountMenu();
                    break;
                case 2:
                    depositFlow();
                    break;
                case 3:
                    withdrawFlow();
                    break;
                case 4:
                    displayAccountDetails();
                    break;
                case 5:
                    displayAllAccounts();
                    break;
                case 6:
                    showTransactionHistory();
                    break;
                case 8:
                    searchAccountByName();
                    break;
                case 9:
                    closeAccount();
                    break;
                case 10:
                    applyInterest();
                    break;
                case 11:
                    repayLoan();
                    break;
                case 12:
                    miniStatement();
                    break;
                case 13:
                    transferFunds();
                    break;
                case 14:
                    sortAccountsMenu();
                    break;
                case 7:
                    System.out.println("Exiting. Thank you!");
                    break;
                default:
                    System.out.println("Invalid choice. Try again.");
            }
        }
        sc.close();
    }

    static void showMenu() {
        System.out.println("\n1. Create Account");
        System.out.println("2. Deposit Amount");
        System.out.println("3. Withdraw Amount");
        System.out.println("4. Display Account Details (by account number)");
        System.out.println("5. Display All Accounts");
        System.out.println("6. Transaction History");
        System.out.println("7. Exit");
        System.out.println("8. Search Account by Name");
        System.out.println("9. Close/Deactivate Account");
        System.out.println("10. Apply Interest (Saving/Salary)");
        System.out.println("11. Repay Loan");
        System.out.println("12. Mini Statement");
        System.out.println("13. Transfer Funds");
        System.out.println("14. Sort Accounts");
        System.out.print("Choose option: ");
    }

    // --------------------------- DEMO DATA ---------------------------
    static void seedDemoData() {
        SavingAccount s = new SavingAccount(nextAccountNumber++, "Pratik", 5000.0, 123412341234L, 432143214321L);
        CurrentAccount c = new CurrentAccount(nextAccountNumber++, "Akash", 20000.0, 111122223333L, 333322221111L);
        SalaryAccount sal = new SalaryAccount(nextAccountNumber++, "Sneha", 15000.0, 222233334444L, 444433332222L);
        LoanAccount loan = new LoanAccount(nextAccountNumber++, "Ramesh", 0.0, 555566667777L, 777766665555L, 50000.0);

        accounts.addAll(Arrays.asList(s, c, sal, loan));
    }

    static void createAccountMenu() {
        while (true) {
            System.out.println("\n----- Create Account Menu -----");
            System.out.println("1. Saving Account");
            System.out.println("2. Current Account");
            System.out.println("3. Salary Account");
            System.out.println("4. Loan Account");
            System.out.println("5. Back to Main Menu");
            System.out.print("Choose option: ");
            String t = sc.nextLine();

            if (t.equals("5")) {
                System.out.println("Returning to Main Menu...");
                break;
            }

            if (!t.equals("1") && !t.equals("2") && !t.equals("3") && !t.equals("4")) {
                System.out.println("Invalid choice. Try again.");
                continue;
            }

            System.out.print("Enter name: ");
            String name = sc.nextLine();

            System.out.print("Enter initial balance: ");
            double bal = readDouble();

            System.out.print("Enter Aadhar (numbers only): ");
            long aadhar = readLong();

            System.out.print("Enter nominee Aadhar: ");
            long nominee = readLong();

            BankAccount acc = null;
            long accNo = nextAccountNumber++;

            switch (t) {
                case "1":
                    acc = new SavingAccount(accNo, name, bal, aadhar, nominee);
                    break;
                case "2":
                    acc = new CurrentAccount(accNo, name, bal, aadhar, nominee);
                    break;
                case "3":
                    acc = new SalaryAccount(accNo, name, bal, aadhar, nominee);
                    break;
                case "4":
                    System.out.print("Enter loan amount for loan account: ");
                    double loanAmt = readDouble();
                    acc = new LoanAccount(accNo, name, bal, aadhar, nominee, loanAmt);
                    break;
            }

            accounts.add(acc);
            System.out.println("Account created. Account Number = " + accNo);
        }
    }

    static void depositFlow() {
        BankAccount acc = selectAccount();
        if (acc != null) {
            System.out.print("Enter amount to deposit: ");
            double amt = readDouble();
            acc.deposit(amt);
        }
    }

    static void withdrawFlow() {
        BankAccount acc = selectAccount();
        if (acc != null) {
            System.out.print("Enter amount to withdraw: ");
            double amt = readDouble();
            try {
                acc.withdraw(amt);
            } catch (InvalidTransactionException e) {
                System.out.println("Transaction failed: " + e.getMessage());
            }
        }
    }

    static void displayAccountDetails() {
        BankAccount acc = selectAccount();
        if (acc != null) {
            acc.showDetails();
        }
    }

    static void displayAllAccounts() {
        System.out.println("--- All Accounts ---");
        for (BankAccount a : accounts) {
            a.showDetails();
            System.out.println("---------------------");
        }
    }

    static void showTransactionHistory() {
        BankAccount acc = selectAccount();
        if (acc != null) {
            List<Transaction> tx = acc.getTransactions();
            System.out.println("Transactions for account " + acc.getAccountNumber() + ":");
            if (tx.isEmpty())
                System.out.println("No transactions yet.");
            else
                for (Transaction t : tx)
                    System.out.println(t);
        }
    }

    static void searchAccountByName() {
        System.out.print("Enter name to search: ");
        String name = sc.nextLine().toLowerCase();
        boolean found = false;
        for (BankAccount acc : accounts) {
            if (acc.getAccountHolderName().toLowerCase().contains(name)) {
                acc.showDetails();
                System.out.println("---------------------");
                found = true;
            }
        }
        if (!found)
            System.out.println("No account found with name containing: " + name);
    }

    static void closeAccount() {
        BankAccount acc = selectAccount();
        if (acc != null) {
            acc.setAccountStatus(false);
            System.out.println("Account " + acc.getAccountNumber() + " has been deactivated.");
        }
    }

    static void applyInterest() {
        for (BankAccount acc : accounts) {
            if (acc instanceof SavingAccount) {
                SavingAccount sa = (SavingAccount) acc;
                double interest = sa.getBalance() * SavingAccount.getSavingInterestRate() / 100.0;
                sa.deposit(interest);
                System.out.println("Applied interest " + interest + " to account " + sa.getAccountNumber());
            } else if (acc instanceof SalaryAccount) {
                SalaryAccount sal = (SalaryAccount) acc;
                double interest = sal.getBalance() * SalaryAccount.getInterestRate() / 100.0;
                sal.deposit(interest);
                System.out.println("Applied interest " + interest + " to account " + sal.getAccountNumber());
            }
        }
        System.out.println("Interest applied to all applicable accounts.");
    }

    static void repayLoan() {
        BankAccount acc = selectAccount();
        if (acc instanceof LoanAccount) {
            LoanAccount loanAcc = (LoanAccount) acc;
            System.out.print("Enter repayment amount: ");
            double amt = readDouble();
            loanAcc.deposit(amt); // deposit works as repayment
        } else {
            System.out.println("Selected account is not a Loan account.");
        }
    }

    static void miniStatement() {
        BankAccount acc = selectAccount();
        if (acc != null) {
            List<Transaction> tx = acc.getTransactions();
            System.out.println("Mini Statement for account " + acc.getAccountNumber() + ":");
            if (tx.isEmpty())
                System.out.println("No transactions yet.");
            else
                tx.stream().skip(Math.max(0, tx.size() - 5)).forEach(System.out::println);
        }
    }

    static void transferFunds() {
        System.out.print("Enter source account number: ");
        BankAccount src = findAccount(readLong());
        if (src == null) {
            System.out.println("Source account not found.");
            return;
        }
        System.out.print("Enter target account number: ");
        BankAccount tgt = findAccount(readLong());
        if (tgt == null) {
            System.out.println("Target account not found.");
            return;
        }
        System.out.print("Enter amount to transfer: ");
        double amt = readDouble();
        try {
            src.withdraw(amt);
            tgt.deposit(amt);
            System.out.println("Transferred " + amt + " from " + src.getAccountNumber() + " to " + tgt.getAccountNumber());
        } catch (InvalidTransactionException e) {
            System.out.println("Transfer failed: " + e.getMessage());
        }
    }

    static void sortAccountsMenu() {
        System.out.println("Sort by: 1-Balance 2-Name 3-Account Number");
        int option = (int) readDouble();
        Comparator<BankAccount> comp = null;
        switch (option) {
            case 1:
                comp = Comparator.comparingDouble(BankAccount::getBalance);
                break;
            case 2:
                comp = Comparator.comparing(BankAccount::getAccountHolderName);
                break;
            case 3:
                comp = Comparator.comparingLong(BankAccount::getAccountNumber);
                break;
            default:
                System.out.println("Invalid choice.");
                return;
        }
        accounts.sort(comp);
        System.out.println("Accounts sorted.");
    }

    static BankAccount selectAccount() {
        System.out.print("Enter account number: ");
        long accNo = readLong();
        BankAccount acc = findAccount(accNo);
        if (acc == null)
            System.out.println("Account not found.");
        return acc;
    }

    static BankAccount findAccount(long accNo) {
        for (BankAccount a : accounts)
            if (a.getAccountNumber() == accNo)
                return a;
        return null;
    }

    static double readDouble() {
        try {
            return Double.parseDouble(sc.nextLine());
        } catch (NumberFormatException e) {
            System.out.println("Invalid number. Using 0.");
            return 0.0;
        }
    }

    static long readLong() {
        try {
            return Long.parseLong(sc.nextLine());
        } catch (NumberFormatException e) {
            System.out.println("Invalid number. Using 0.");
            return 0L;
        }
    }
}
