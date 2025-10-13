package dao;

public interface AccountOperation {

    // --- Core Operations ---
    void deposit(double amount);
    void withdraw(double amount) throws InvalidTransactionException;
    void showDetails();

    // --- Getters and Setters ---
    double getBalance();
    void setBalance(double balance);

    long getAccountNumber();
    void setAccountNumber(long accountNumber);

    String getAccountHolderName();
    void setAccountHolderName(String accountHolderName);
}
