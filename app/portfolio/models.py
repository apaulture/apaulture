from django.db import models


class Branch(models.Model):
    name = models.CharField(max_length=20, unique=True)

class Subbranch(models.Model):
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    name = models.CharField(max_length=20, unique=True)
    
    def __str__(self):
        return self.name

class Skill(models.Model):
    subbranch = models.ForeignKey(Subbranch, on_delete=models.CASCADE)
    name = models.CharField(max_length=20, unique=True)
    days = models.PositiveIntegerField(default=0)
    active = models.BooleanField(default=False)

    def __str__(self):
        return self.name