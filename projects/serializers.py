from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    manager_username = serializers.CharField(source='manager.username', read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'manager', 'manager_username']
