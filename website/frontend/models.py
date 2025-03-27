from django.db import models
from django.utils import timezone


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

    author = models.CharField(
        max_length=120,
        null=False
    )
    author_email = models.EmailField(
        max_length=200,
        null=False,
        unique=True
    ) 
    memoir_category_id = models.ForeignKey(
        MemoirsCategories,
        on_delete=models.CASCADE
    )
    date = models.DateField()
    title = models.CharField(
        max_length=300, 
        null=False
    )
    resume = models.TextField()
    content = models.TextField(null=False)
    file_path = models.TextField(help_text="Absolute path to the file on the storage",)
    reading_time = models.PositiveIntegerField(
        default=0,
        help_text="Reading time in minutes"
    )
    visualizations = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)
    notes = models.TextField()
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='draft'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"{self.author}, {self.author_email}, {self.memoir_category_id}, {self.title}: {self.resume[:199]}"


class MemoirsComments(models.Model):
    author = models.CharField(
        max_length=120, 
        null=False
    )
    memoir_id = models.ForeignKey(
        Memoirs,
        on_delete=models.CASCADE,
        related_name='comments'
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

    category_id = models.ForeignKey(
        AgendaCategories,
        on_delete=models.CASCADE
    )
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



