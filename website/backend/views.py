from django.http import HttpResponse
from rest_framework.generics import ListCreateAPIView
from .models import Memoirs, MemoirsCategories, MemoirsComments, Agenda, AgendaCategories
from .serializer import MemoirsSerializer, MemoirsCategoriesSerializer, MemoirsCommentsSerializer, AgendaSerializer, AgendaCategoriesSerializer, AgendaCategoriesWithAgendaSerializer, MemoirsCategoriesWithMemoirsSerializer



def index(request):
	return HttpResponse("Hello World!")

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