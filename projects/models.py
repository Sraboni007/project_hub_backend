from django.db import models
from users.models import User  

class Project(models.Model):
    title = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField()
    manager = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True, related_name='managed_projects')

    def __str__(self):
        return self.title
