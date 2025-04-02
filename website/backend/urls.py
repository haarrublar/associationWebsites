from django.urls import path

from .views import index, MemoirsView, MemoirsCategoriesView, MemoirsCommentsView, AgendaView, AgendaCategoriesView

urlpatterns = [
	path("", index, name="index"),
    path("memoirs/", MemoirsView.as_view(), name="memoirs"),
    path("memoirs-categories/", MemoirsCategoriesView.as_view(), name="memoirscategories"),
    path("memoirs-comments/", MemoirsCommentsView.as_view(), name="memoirscomments"),
    path("agenda/", AgendaView.as_view(), name="agenda"),
    path("agenda-categories/", AgendaCategoriesView.as_view(), name="agendacategories")
]
