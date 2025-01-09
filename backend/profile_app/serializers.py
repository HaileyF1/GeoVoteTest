from rest_framework.serializers import ModelSerializer, StringRelatedField
from .models import Profile, Address

class ProfileSerializer(ModelSerializer):
    address = StringRelatedField()
    
    class Meta:
        model = Profile
        fields = '__all__'

class AddressSerializer(ModelSerializer):
    user = StringRelatedField()
    
    class Meta:
        model = Address
        fields = '__all__' 