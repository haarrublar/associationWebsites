
from django.conf import settings
from django.db import models
from django.contrib.auth.hashers import make_password
from phone_field import PhoneField
from cryptography.fernet import Fernet



class SurveyRespondent(models.Model):

    username = None
    email = models.EmailField(max_length=200, unique=True)
    password = models.CharField(max_length=128)
    
    organization = models.CharField(max_length=500, null=False)
    name = models.EmailField(max_length=200)
    last_name = models.EmailField(max_length=200)
    national_id = models.CharField(max_length=20, null=False)
    phone_number = PhoneField(null=False)
    
    country = models.CharField(default='Colombia')
    department = models.CharField(max_length=100, null=False)
    municipality = models.CharField(max_length=100, null=False)
    city = models.CharField(max_length=100, null=False)
    geolocalization = models.CharField(max_length=150, null=False, help_text="DIVIPOLA DANE")
    geolocalization_coordinate = models.CharField(max_length=100)
    
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  
    
    class Meta:
        verbose_name_plural = "Survey Respondents"
    
    def __str__(self):
        return self.email
    
    

class EncryptedUserSecret(models.Model):
    survey_respondent = models.OneToOneField(SurveyRespondent, on_delete=models.CASCADE)
    encrypted_password = models.BinaryField()  
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()  

    @classmethod
    def encrypt_password(cls, password):
        """
        Encrypt the given password using Fernet encryption.
        """
        key = settings.ENCRYPTION_KEY.encode()  
        cipher = Fernet(key)
        return cipher.encrypt(password.encode())  

    @classmethod
    def decrypt_password(cls, encrypted_password):
        """
        Decrypt the encrypted password and return the plain-text password.
        """
        key = settings.ENCRYPTION_KEY.encode()  
        cipher = Fernet(key)
        return cipher.decrypt(encrypted_password).decode() 
    
    
    
# class SurveyRespondentManager(BaseUserManager):

#     def create_survey_respondent(self, email, password=None, **extra_fields):
#         if not email:
#             raise ValueError('Users must have an email address')
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
        
#         return self.create_user(email, password, **extra_fields)
    
    
# class SurveyRespondent(AbstractUser):

#     username = None
#     email = models.EmailField(max_length=200, unique=True)
#     name = models.EmailField(max_length=200)
#     last_name = models.EmailField(max_length=200)
#     organization = models.CharField(max_length=500, null=False)
#     national_id = models.CharField(max_length=20, null=False)
#     location = models.CharField(max_length=500, null=False)
#     created_at = models.DateTimeField(auto_now_add=True)
    
#     objects = SurveyRespondentManager()
    
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []  
    
    
#     class Meta:
#         verbose_name_plural = "Survey Respondents"
    
#     def __str__(self):
#         return self.email
    
    
    
class TeamMember(models.Model):
    name = models.CharField(max_length=250, null=False)
    email = models.EmailField(max_length=200,null=False,unique=True) 
    studies = models.CharField(max_length=500, null=False) 
    profession = models.CharField(max_length=500, null=False)
    description = models.TextField(null=False)

    def __str__(self):
        return f"{self.name} - {self.email}"


class MemoirsCategories(models.Model):
    category = models.CharField(max_length=120, null=False, unique=True)


    class Meta:
        verbose_name_plural = "Memoirs Categories"

    def __str__(self):
        return f"{self.category}"


class Memoirs(models.Model):

    STATUS_CHOICES = [
        ('publish', 'Publish'),
        ('draft', 'Draft'),
        ('withdrawn', 'Withdrawn')
    ]

    # --------- Foreign Key --------- #
    category = models.ForeignKey(
        MemoirsCategories,
        on_delete=models.CASCADE,
        related_name='memoirs'
    )
    # --------- Foreign Key --------- #

    author = models.CharField(
        max_length=120,
        null=False
    )
    author_email = models.EmailField(
        max_length=200,
        null=False
    ) 
    date = models.DateField()
    title = models.CharField(
        max_length=300, 
        null=False
    )
    resume = models.TextField()
    content = models.TextField(null=False)
    file_path = models.TextField(help_text="Absolute path to the file on the storage",blank=True)
    reading_time = models.PositiveIntegerField(
        default=0,
        help_text="Reading time in minutes"
    )
    visualizations = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)
    notes = models.TextField(blank=True)
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='draft'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Memoirs"


    def __str__(self):
        return f"{self.author}, {self.author_email}, {self.memoir_category_id}, {self.title}: {self.resume[:199]}"


class MemoirsComments(models.Model):
    
    # --------- Foreign Key --------- #
    memoir = models.ForeignKey(
        Memoirs,
        on_delete=models.CASCADE,
        related_name='comments',
        default=1
    )
    # --------- Foreign Key --------- #
    
    author = models.CharField(
        max_length=120, 
        null=False
    )
    content = models.CharField(
        max_length=2000, 
        null=False
    )
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Memoirs Comments"

    def __str__(self):
        return f"{self.author}: {self.content[:50]}"


class AgendaCategories(models.Model):
    category = models.CharField(max_length=300, null=False)

    class Meta:
        verbose_name_plural = "Agenda Categories"

    def __str__(self):
        return f"{self.category}"


class Agenda(models.Model):

    STATUS_CHOICES = [
        ('publish', 'Publish'),
        ('draft', 'Draft'),
        ('withdrawn', 'Withdrawn')
    ]

    # --------- Foreign Key --------- #
    category = models.ForeignKey(
        AgendaCategories,
        on_delete=models.CASCADE,
        related_name='agenda',
        default=1
    )
    # --------- Foreign Key --------- #

    date = models.DateField()
    event = models.CharField(
        max_length=500, 
        null=False
    )
    description = models.TextField()
    content = models.TextField(null=False)
    footnote = models.TextField()
    file_path = models.TextField(help_text="Absolute path to the file on the storage",)
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='draft'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        verbose_name_plural = "Agenda"

    def __str__(self):
        return f"{self.category}, {self.event}, {self.content[:199]}"
