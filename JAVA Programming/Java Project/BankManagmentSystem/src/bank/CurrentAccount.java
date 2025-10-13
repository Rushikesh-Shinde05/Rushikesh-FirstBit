package bank;

import dao.InvalidTransactionException;

public class CurrentAccount extends BankAccount {
    final double minimum_balance = 10000.0;
    double overdraftlimit = 5000.0; // demo overdraft

    public CurrentAccount(long accountNumber, String accountHoldername, double balance, long accountHolderAadhar,
            long nomineeAadhar) {
        super(accountNumber, accountHoldername, balance, accountHolderAadhar, nomineeAadhar);
    }

    public double getOverdraftlimit() {
        return overdraftlimit;
    }

    public void setOverdraftlimit(double overdraftlimit) {
        this.overdraftlimit = overdraftlimit;
    }

    @Override
    public void withdraw(double amount) throws InvalidTransactionException {
        if (amount <= 0) {
            throw new InvalidTransactionException("Withdraw amount must be positive.");
        }
        double allowed = getBalance() + overdraftlimit;
        if (amount > allowed) {
            throw new InvalidTransactionException("Exceeded overdraft limit. Max withdrawable = " + allowed);
        }
        setBalance(getBalance() - amount);
        addTransaction("Withdraw", amount);
        System.out.println("Withdrawn " + amount + ". New balance = " + getBalance());
    }

    @Override
    public String toString() {
        return "CurrentAccount " + super.toString() + ", overdraft=" + overdraftlimit;
    }
}
