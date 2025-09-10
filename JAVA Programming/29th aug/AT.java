class Bank {   // default access (package-private)
    void info() {
        System.out.println("I am Bank class");
    }
}
 class AT {
    public static void main(String[] args) {
        Bank bank = new Bank(); //  same package में accessible
        bank.info();
    }
}