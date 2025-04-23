from django.contrib import admin
from .models import TeamMember, MemoirsCategories, MemoirsComments, Memoirs, AgendaCategories, Agenda, SurveyRespondent, EncryptedUserSecret



@admin.register(EncryptedUserSecret)
class EncryptedUserSecretAdmin(admin.ModelAdmin):
    list_display = ['survey_respondent', 'created_at', 'expires_at']
    
    def get_password_display(self, obj):
        return '******'  # Hide the actual password in the admin
    
    get_password_display.short_description = 'Password'

class CustomAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return True  # Allow adding objects globally
    
    def has_delete_permission(self, request, obj=None):
        return True  # Allow deleting objects globally

@admin.register(SurveyRespondent)
class SurveyRespondentAdmin(CustomAdmin):
    pass

@admin.register(TeamMember)
class TeamMemberAdmin(CustomAdmin):
    pass

@admin.register(MemoirsCategories)
class MemoirsCategoriesAdmin(CustomAdmin):
    pass

@admin.register(MemoirsComments)
class MemoirsCommentsAdmin(CustomAdmin):
    pass

@admin.register(Memoirs)
class MemoirsAdmin(CustomAdmin):
    pass

@admin.register(AgendaCategories)
class AgendaCategoriesAdmin(CustomAdmin):
    pass

@admin.register(Agenda)
class AgendaAdmin(CustomAdmin):
    pass