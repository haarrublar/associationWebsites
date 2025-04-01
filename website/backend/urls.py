from django.urls import path

from .views import ReactView, index

urlpatterns = [
	path("", index, name="index"),
    path("reactview/", ReactView.as_view(), name="reactview")
]
