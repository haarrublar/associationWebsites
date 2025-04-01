from django.http import HttpResponse
from rest_framework.views import APIView
from .models import MemoirsCategories
from .serializer import MemoirsCategoriesSerializer
from rest_framework.response import Response



def index(request):
	return HttpResponse("Hello World!")

class ReactView(APIView):
	def get(self, request):
		output_list = [{"id": item.id,
                   "category": item.category,
				   "memoirs": [{
					   "title": memoir.title, 
					   "author": memoir.author
					} for memoir in item.memoirs.all()]}
					for item in MemoirsCategories.objects.all()
				]


		return Response(output_list)
	
	def post(self, request):
		serializer = MemoirsCategoriesSerializer(data=request.data)
		if serializer.is_valid(raise_exception=True):
			serializer.save()
			return Response(serializer.data)