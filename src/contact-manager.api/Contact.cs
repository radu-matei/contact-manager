public class Contact
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }

    public Contact(string firstName, string lastName, string email, string phoneNumber)
    {
      FirstName = firstName;
      LastName = lastName;
      Email = email;
      PhoneNumber = phoneNumber;
    }

    public Contact()
    {
    }
}