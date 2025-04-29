from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from knox.models import AuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.http import HttpResponse
from django.conf import settings
from django.core.cache import cache
import requests
import traceback

from .serializers import RegisterSerializer, LoginSerializer, UserSerializer

User = get_user_model()
class LoginViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.user  # Get the authenticated user from serializer
            _, token = AuthToken.objects.create(user)
            return Response({
                "user": UserSerializer(user).data,
                "token": token
            })
        else:
            return Response(serializer.errors, status=400)


class RegisterViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request):
        """
        Register a new user and return the user data.
        """
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            if User.objects.filter(email=email).exists():
                return Response({"error": "Email already exists"}, status=400)

            username = serializer.validated_data.get('username')
            if User.objects.filter(username=username).exists():
                return Response({"error": "Username already exists"}, status=400)

            user = serializer.save()
            return Response(RegisterSerializer(user).data)
        else:
            return Response(serializer.errors, status=400)


class UserViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def list(self, request):
        queryset = User.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_logged_in_user(request):
    user = request.user
    return Response({
        'id': user.id,
        'email': user.email,
        'username': user.username,
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_greeting_audio(request, username):
    """
    Generate and return a personalized greeting audio using ElevenLabs API.
    """
    try:
        if not settings.ELEVENLABS_API_KEY:
            print("ElevenLabs API key not configured")
            return Response({'error': 'ElevenLabs API key not configured'}, status=500)

        cache_key = f'greeting_audio_{username}'
        cached_audio = cache.get(cache_key)
        if cached_audio:
            print("Using cached audio")
            return HttpResponse(cached_audio, content_type='audio/mpeg')

        text = f"Hello... {username}!"
        url = f"https://api.elevenlabs.io/v1/text-to-speech/{settings.ELEVENLABS_VOICE_ID}"
        headers = {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": settings.ELEVENLABS_API_KEY
        }
        data = {
            "text": text,
            "model_id": "eleven_monolingual_v1",
            "voice_settings": {
                "stability": 0.15,
                "similarity_boost": 0.15,
                "style": 0.15,
                "use_speaker_boost": True,
                "speaking_rate": 0.7
            }
        }

        print(f"Calling ElevenLabs API for: {text}")
        print(f"Using voice ID: {settings.ELEVENLABS_VOICE_ID}")

        response = requests.post(url, json=data, headers=headers)

        if response.status_code == 200:
            audio_content = response.content
            cache.set(cache_key, audio_content, timeout=3600)
            return HttpResponse(audio_content, content_type='audio/mpeg')
        else:
            error_message = f"ElevenLabs API error: {response.text}"
            print(error_message)
            return Response({'error': error_message}, status=response.status_code)

    except Exception as e:
        error_message = f"Error generating audio: {str(e)}"
        print(error_message)
        print("Full traceback:")
        print(traceback.format_exc())
        return Response({'error': error_message}, status=500)
