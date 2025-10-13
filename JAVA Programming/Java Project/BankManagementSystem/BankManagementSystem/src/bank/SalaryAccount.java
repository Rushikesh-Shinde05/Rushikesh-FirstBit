package bank;

import dao.InvalidTransactionException;

public class SalaryAccount extends BankAccount {
    static double interestRate = 4.5; // demo

    public SalaryAccount(long accountNumber, String accountHoldername, double balance, long accountHolderAadhar,
            long nomineeAadhar) {
        super(accountNumber, accountHoldername, balance, accountHolderAadhar, nomineeAadhar);
    }

    @Override
    public void withdraw(double amount) throws InvalidTransactionException {
        if (amount <= 0) {
            throw new InvalidTransactionException("Withdraw amount must be positive.");
        }
        if (amount > getBalance()) {
            throw new InvalidTransactionException("Insufficient balance. Salary account doesn't allow overdraft.");
        }
        setBalance(getBalance() - amount);
        addTransaction("Withdraw", amount);
        System.out.println("Withdrawn " + amount + ". New balance = " + getBalance());
    }

    public static double getInterestRate() {
        return interestRate;
    }

    @Override
    public String toString() {
        return "SalaryAccount " + super.toString();
    }
}
