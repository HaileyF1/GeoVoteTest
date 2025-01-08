from rest_framework.serializers import ModelSerializer
from .models import User
from profile_app.models import ProfileSerializer

class UserSerializer(ModelSerializer):
    profile = ProfileSerializer()
    
    class Meta:
        model = User
        fields = '__all__'