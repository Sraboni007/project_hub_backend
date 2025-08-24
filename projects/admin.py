from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'manager', 'description')
    list_filter = ('manager',)
    search_fields = ('title', 'description')
