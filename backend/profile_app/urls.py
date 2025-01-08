from django.urls import path
from .views import ProfileView, UserInfo


urlpatterns = [
    path("", ProfileView.as_view(), name="profile"),
    path('info/', UserInfo.as_view(), name='info'),
]