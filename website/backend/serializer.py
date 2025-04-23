from rest_framework import serializers
from .models import MemoirsCategories, Memoirs, MemoirsComments, AgendaCategories, Agenda, SurveyRespondent
from django.contrib.auth import get_user_model
from .models import EncryptedUserSecret


class EncryptedUserSecretSerializer(serializers.ModelSerializer):
    encrypted_password = serializers.CharField(write_only=True, required=True)  # Hide in response
    decrypted_password = serializers.SerializerMethodField()  # To decrypt for admin use
    
    class Meta:
        model = EncryptedUserSecret
        fields = ['survey_respondent', 'encrypted_password', 'created_at', 'expires_at', 'decrypted_password']
    
    def get_decrypted_password(self, obj):
        """
        Decrypt the password if necessary (admin purposes).
        """
        return EncryptedUserSecret.decrypt_password(obj.encrypted_password)

    def create(self, validated_data):
        """
        Override the create method to encrypt password before saving.
        """
        encrypted_password = EncryptedUserSecret.encrypt_password(validated_data['encrypted_password'])
        validated_data['encrypted_password'] = encrypted_password
        
        return super().create(validated_data)

    def update(self, instance, validated_data):
        """
        Override the update method to re-encrypt the password if updated.
        """
        if 'encrypted_password' in validated_data:
            encrypted_password = EncryptedUserSecret.encrypt_password(validated_data['encrypted_password'])
            validated_data['encrypted_password'] = encrypted_password
            
        return super().update(instance, validated_data)


class SurveyRespondentSerializer(serializers.ModelSerializer):
    password_validation = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = SurveyRespondent
        fields = ['email', 'organization', 'name', 'last_name', 'national_id', 'phone_number', 'country', 'department', 'municipality', 'city', 'geolocalization', 'geolocalization_coordinate', 'created_at']
        extra_kwargs = {
            'password': {'write_only': True},
        }
    
    def validate(self, data):
        if data['password'] != data['password_validation']:
            raise serializers.ValidationError({'password_validation': 'Passwords must match'})
        
        data.pop('password_validation')
        return data



User = get_user_model()
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']
        
    email = serializers.EmailField()
    password = serializers.CharField()    
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)   
        ret.pop('password')
        return ret


# class RegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id','email','password')
#         extra_kwargs = {
#             'password': {'write_only': True},
#         }
    
#     def create(self, validated_data):
#         user = User.objects.create_user(**validated_data)
#         return user
        



class MemoirsCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemoirsCategories
        fields = [
            'id',
            'category'
        ]

class MemoirsSerializer(serializers.ModelSerializer):
    category_detail = MemoirsCategoriesSerializer(
        source='category',
        read_only=True
    )
    category_field = serializers.PrimaryKeyRelatedField(
        queryset=MemoirsCategories.objects.all(), 
        write_only=True,
        source='category'
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
            'category_detail',
            'category_field'
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

class MemoirsCategoriesWithMemoirsSerializer(serializers.ModelSerializer):
    memoirs = MemoirsSerializer(many=True, read_only=True)
    
    class Meta:
        model = MemoirsCategories
        fields = [
            'id',
            'category',
            'memoirs'        
        ]

class AgendaCategoriesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = AgendaCategories
        fields = [
            'id',
            'category'
        ]

    def get_agenda(self, obj):
        return AgendaSerializer(obj.agenda.all(),many=True).data
    
class AgendaSerializer(serializers.ModelSerializer):
    category_detail = AgendaCategoriesSerializer(
        source='category',
        read_only=True
    )
    category_field = serializers.PrimaryKeyRelatedField(
        queryset=AgendaCategories.objects.all(), 
        write_only=True,
        source='category'
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
            'category_detail',
            'category_field'
        ]

        read_only_fields = [
            'status',
            'created_at',
            'updated_at' 
        ]

class AgendaCategoriesWithAgendaSerializer(serializers.ModelSerializer):
    agenda = AgendaSerializer(many=True, read_only=True)
    
    class Meta:
        model = AgendaCategories
        fields = [
            'id',
            'category',
            'agenda'        
        ]



