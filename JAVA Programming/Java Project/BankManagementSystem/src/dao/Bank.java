package dao;

public class Bank {
    public int branchId;
    public String bankName;
    public String branchName;
    public String bankLocation;
    public int totalAccountcount;
    public String IfscCode;

    public Bank() {
        branchId = 101;
        bankName = "HDFC";
        branchName = "Pune";
        bankLocation = "Deccan";
        totalAccountcount = 0;
        IfscCode = "HDFC0001";
    }

    public Bank(int branchId, String bankName, String branchName, String bankLocation, int totalAccountcount,
            String ifscCode) {
        this.branchId = branchId;
        this.bankName = bankName;
        this.branchName = branchName;
        this.bankLocation = bankLocation;
        this.totalAccountcount = totalAccountcount;
        IfscCode = ifscCode;
    }

    @Override
    public String toString() {
        return "Bank [branchId=" + branchId + ", bankName=" + bankName + ", branchName=" + branchName
                + ", bankLocation=" + bankLocation + ", totalAccountcount=" + totalAccountcount + ", IfscCode="
                + IfscCode + "]";
    }
}
