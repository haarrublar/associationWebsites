from rest_framework import serializers
from .models import MemoirsCategories, Memoirs, MemoirsComments, AgendaCategories, Agenda


class MemoirsCategoriesSerializer(serializers.ModelSerializer):

    memoirs = serializers.SerializerMethodField() #adding nested categories
    class Meta:
        model = MemoirsCategories
        fields = [
            'id',
            'category',
            'memoirs'
        ]

    def get_memoirs(self, obj):
        return MemoirsSerializer(obj.memoirs.all(), many=True).data

class MemoirsSerializer(serializers.ModelSerializer):
    
    comments = serializers.SerializerMethodField()
    category_detail = MemoirsCategoriesSerializer(
        source='category',
        read_only=True
    )

    class Meta:
        model = Memoirs
        fields = [
            'id',
            'author',
            'author_email',
            'date',
            'title',
            'resume',
            'content',
            'file_path',
            'reading_time',
            'visualizations',
            'likes',
            'notes',
            'status',
            'created_at',
            'updated_at',
            'comments',
            'category_detail'
        ]

        read_only_fields = [
            'visualizations',
            'likes',
            'created_at',
            'updated_at'
        ]

    def get_comments(self, obj):
        comments = obj.comments.filter(is_deleted=False)  
        return MemoirsCommentsSerializer(comments, many=True).data

class MemoirsCommentsSerializer(serializers.ModelSerializer):

    comment = serializers.CharField(
        source='memoir.title',
        read_only=True
    )

    class Meta:
        model = MemoirsComments
        fields = [
            'author',
            'content',
            'is_deleted',
            'created_at',
            'comment'
        ]

        read_only_fields = [
            'is_deleted',
            'updated_at'
        ]

class AgendaCategoriesSerializer(serializers.ModelSerializer):
    agenda = serializers.SerializerMethodField() #adding nested categories
    class Meta:
        model = AgendaCategories
        fields = [
            'id',
            'category',
            'agenda'
        ]

    def get_agenda(self, obj):
        return AgendaSerializer(obj.agenda.all(),many=True).data
    
class AgendaSerializer(serializers.ModelSerializer):
    category_detail = AgendaCategoriesSerializer(
        source='category',
        read_only=True
    )

    class Meta:
        model = Agenda
        fields = [
            'date',
            'event',
            'description',
            'content',
            'footnote',
            'file_path',
            'status',
            'created_at',
            'updated_at',
            'category_detail'
        ]

        read_only_fields = [
            'status',
            'created_at',
            'updated_at' 
        ]



