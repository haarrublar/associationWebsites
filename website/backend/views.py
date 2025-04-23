from django.http import HttpResponse
from rest_framework.generics import ListCreateAPIView
from .models import Memoirs, MemoirsCategories, MemoirsComments, Agenda, AgendaCategories
from .serializer import MemoirsSerializer, MemoirsCategoriesSerializer, MemoirsCommentsSerializer, AgendaSerializer, AgendaCategoriesSerializer, AgendaCategoriesWithAgendaSerializer, MemoirsCategoriesWithMemoirsSerializer, LoginSerializer

from django.contrib.auth import authenticate, get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status, viewsets, permissions
from knox.models import AuthToken



def index(request):
	return HttpResponse("Hello World!")


User = get_user_model()


class LoginViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            email = serializer.validated_data['email']  
            password = serializer.validated_data['password']  
            
            user = authenticate(email=email, password=password)
            
            if user:
                instance, token = AuthToken.objects.create(user)
                return Response({
                    'user': self.serializer_class(user).data,
                    'token': token
                })
            
        else:
            return Response({"error":"Invalid credentials"}, status=401)

# class RegisterViewSet(viewsets.ViewSet):
#     permission_classes = [permissions.AllowAny]
#     queryset = User.objects.all()
#     serializer_class = RegisterSerializer
    
#     def create(self, request):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
        
#         else:
#             return Response(serializer.errors, status=400)
        

        
# @api_view(['POST

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def LoginView(request):
#     email = request.data.get('email')
#     password = request.data.get('password')
    
#     user = authenticate(email=email, password=password)
    
#     if user:
#         login(request, user)
#         token, _ = Token.objects.get_or_create(user=user)
#         return Response({
#             'token': token.key,
#             'user': {
#                 'id': user.id,
#                 'email': user.email,
#                 'organization': user.organization,
#                 'location': user.location
#             }
#         })
    
#     return Response(
#         {'message': 'Invalid email or password'}, 
#         status=status.HTTP_401_UNAUTHORIZED
#     )


class MemoirsView(ListCreateAPIView):
    queryset = Memoirs.objects.all()
    serializer_class = MemoirsSerializer


    def get_serializer_class(self):
        if self.request.method == 'GET':
            return MemoirsSerializer
        return super().get_serializer_class()

    def get_serializer(self, *args, **kwargs):
        if self.request.method == 'POST' and isinstance(self.request.data, list):
            kwargs['many'] = True
        return super().get_serializer(*args, **kwargs)

class MemoirsCategoriesView(ListCreateAPIView):
    queryset = MemoirsCategories.objects.all()
    serializer_class = MemoirsCategoriesSerializer


    def get_serializer_class(self):
        return MemoirsCategoriesWithMemoirsSerializer

    def get_serializer(self, *args, **kwargs):
        # Enable bulk creation for lists in POST requests
        if self.request.method == 'POST' and isinstance(self.request.data, list):
            kwargs['many'] = True
        return super().get_serializer(*args, **kwargs)

class MemoirsCommentsView(ListCreateAPIView):
    queryset = MemoirsComments.objects.all()
    serializer_class = MemoirsCommentsSerializer

class AgendaView(ListCreateAPIView):
    queryset = Agenda.objects.all()
    serializer_class = AgendaSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return AgendaSerializer
        return super().get_serializer_class()

    def get_serializer(self, *args, **kwargs):
        if self.request.method == 'POST' and isinstance(self.request.data, list):
            kwargs['many'] = True
        return super().get_serializer(*args, **kwargs)

class AgendaCategoriesView(ListCreateAPIView):
    queryset = AgendaCategories.objects.all()
    serializer_class = AgendaCategoriesSerializer

    def get_serializer_class(self):
        return AgendaCategoriesWithAgendaSerializer

    def get_serializer(self, *args, **kwargs):
        # Enable bulk creation for lists in POST requests
        if self.request.method == 'POST' and isinstance(self.request.data, list):
            kwargs['many'] = True
        return super().get_serializer(*args, **kwargs)
    
    
    