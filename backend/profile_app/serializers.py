from rest_framework.serializers import ModelSerializer, ReadOnlyField
from .models import Profile, Address


class AddressSerializer(ModelSerializer):
    user = ReadOnlyField(source='user.email')
    
    class Meta:
        model = Address
        fields = '__all__' 
        
class ProfileSerializer(ModelSerializer):
    address = AddressSerializer()
    class Meta:
        model = Profile
        fields = '__all__'        