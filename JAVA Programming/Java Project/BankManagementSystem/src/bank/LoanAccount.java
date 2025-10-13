package bank;

import dao.InvalidTransactionException;

public class LoanAccount extends BankAccount {
    double loanAmount;
    double outstanding;

    public LoanAccount(long accountNumber, String accountHoldername, double balance, long accountHolderAadhar,
            long nomineeAadhar, double loanAmount) {
        super(accountNumber, accountHoldername, balance, accountHolderAadhar, nomineeAadhar);
        this.loanAmount = loanAmount;
        this.outstanding = loanAmount;
    }

    public double getLoanAmount() {
        return loanAmount;
    }

    public double getOutstanding() {
        return outstanding;
    }

    @Override
    public void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Repayment amount must be positive.");
            return;
        }
        double prevOutstanding = this.outstanding;
        this.outstanding -= amount; // reduce outstanding by repayment amount

        // if overpaid, move excess to account balance
        if (this.outstanding < 0) {
            double extra = -this.outstanding;
            this.outstanding = 0;
            setBalance(getBalance() + extra);
        }

        addTransaction("Repayment", amount);
        System.out.println("Repayment " + amount + ". Previous outstanding=" + prevOutstanding + ", New outstanding="
                + this.outstanding + ", balance=" + getBalance());
    }

    @Override
    public void withdraw(double amount) throws InvalidTransactionException {
        throw new InvalidTransactionException("Cannot withdraw from loan account.");
    }

    @Override
    public String toString() {
        return "LoanAccount " + super.toString() + ", loanAmount=" + loanAmount + ", outstanding=" + outstanding;
    }
}
