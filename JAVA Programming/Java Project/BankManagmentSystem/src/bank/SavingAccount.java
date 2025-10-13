package bank;

import dao.InvalidTransactionException;

public class SavingAccount extends BankAccount {
    final double minimum_balance = 2000.0;
    static double savingInterestRate = 0.8; // percent per annum (demo)

    public SavingAccount(long accountNumber, String accountHoldername, double balance, long accountHolderAadhar,
            long nomineeAadhar) {
        super(accountNumber, accountHoldername, balance, accountHolderAadhar, nomineeAadhar);
    }

    public double getMinimum_balance() {
        return minimum_balance;
    }

    public static double getSavingInterestRate() {
        return savingInterestRate;
    }

    @Override
    public void withdraw(double amount) throws InvalidTransactionException {
        if (amount <= 0) {
            throw new InvalidTransactionException("Withdraw amount must be positive.");
        }
        double newBal = getBalance() - amount;
        if (newBal < minimum_balance) {
            throw new InvalidTransactionException(
                    "Cannot withdraw. Minimum balance " + minimum_balance + " must be maintained.");
        }
        setBalance(newBal);
        addTransaction("Withdraw", amount);
        System.out.println("Withdrawn " + amount + ". New balance = " + getBalance());
    }

    @Override
    public String toString() {
        return "SavingAccount " + super.toString() + ", minBalance=" + minimum_balance;
    }
}
