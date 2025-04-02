from django.http import HttpResponse
from rest_framework.generics import ListCreateAPIView
from .models import Memoirs, MemoirsCategories, MemoirsComments, Agenda, AgendaCategories
from .serializer import MemoirsSerializer, MemoirsCategoriesSerializer, MemoirsCommentsSerializer, AgendaSerializer, AgendaCategoriesSerializer
from rest_framework.response import Response



def index(request):
	return HttpResponse("Hello World!")

class MemoirsView(ListCreateAPIView):
    queryset = Memoirs.objects.all()
    serializer_class = MemoirsSerializer

class MemoirsCategoriesView(ListCreateAPIView):
    queryset = MemoirsCategories.objects.all()
    serializer_class = MemoirsCategoriesSerializer

class MemoirsCommentsView(ListCreateAPIView):
    queryset = MemoirsComments.objects.all()
    serializer_class = MemoirsCommentsSerializer

class AgendaView(ListCreateAPIView):
    queryset = Agenda.objects.all()
    serializer_class = AgendaSerializer

class AgendaCategoriesView(ListCreateAPIView):
    queryset = AgendaCategories.objects.all()
    serializer_class = AgendaCategoriesSerializer



