package dao;

import java.util.Date;

public class Transaction {
    private int transactionId;
    private Date transactionDate;
    private String transactionType; // Deposit / Withdraw / Loan / Repayment
    private double amount;
    private double updatedBalance;

    public Transaction(int transactionId, Date transactionDate, String transactionType, double amount,
            double updatedBalance) {
        this.transactionId = transactionId;
        this.transactionDate = transactionDate;
        this.transactionType = transactionType;
        this.amount = amount;
        this.updatedBalance = updatedBalance;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public Date getTransactionDate() {
        return transactionDate;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public double getAmount() {
        return amount;
    }

    public double getUpdatedBalance() {
        return updatedBalance;
    }

    public String toString() {
        return "Id=" + transactionId + ", date=" + transactionDate + ", type=" + transactionType + ", amount="
                + amount + ", balance=" + updatedBalance;
    }
}
